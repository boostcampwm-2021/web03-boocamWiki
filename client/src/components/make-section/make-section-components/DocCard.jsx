import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE } from '@utils/display-width';
import noImg from '@resource/img/no-image.png';
import { flexBox, font } from '@styles/styled-components/mixin';
import { fileUploadValidator } from '@utils/validator';
import { getImgUrl, showErrorCode } from '@services/image-upload';

const cardData = [
  { name: '별명', key: 'nickname' },
  { name: '지역', key: 'location' },
  { name: '주언어', key: 'language' },
  { name: '분야', key: 'field' },
];

const MBTI = [
  'ISTJ',
  'ISTP',
  'ESTP',
  'ESTJ',
  'ISFJ',
  'ISFP',
  'ESFP',
  'ESFJ',
  'INFJ',
  'INFP',
  'ENFP',
  'ENFJ',
  'INTJ',
  'INTP',
  'ENTP',
  'ENTJ',
];

const DocCard = ({ docData, docDispatch }) => {
  let [domain, id] = !docData.link ? ['instagram', ''] : docData.link.split(':');
  if (!domain || !id) {
    [domain, id] = ['instagram', ''];
  }
  const [linkDomain, setLinkDomain] = useState(domain);
  const [linkId, setLinkId] = useState(id);

  const dataValueChange = (e) => {
    const changeData = { type: 'INPUT_DOC_DATA', payload: {} };
    changeData.payload[e.target.id] = e.target.value;
    docDispatch(changeData);
  };

  const profileHandler = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const errorCode = fileUploadValidator(e.target.files);
      if (errorCode > 0) {
        showErrorCode(errorCode);
        return;
      }
      const url = await getImgUrl(e.target.files[0], 1);
      docDispatch({
        type: 'INPUT_DOC_DATA',
        payload: {
          user_image: url,
        },
      });
    }
  };

  const createPlaceHoler = (name) => {
    switch (name) {
      case 'location':
        return 'ex) 서울시 서대문구';
      case 'language':
        return 'ex) 자바스크립트';
      case 'field':
        return 'ex) FE / BE / DEVOPS 등';
      default:
        return '입력하세요';
    }
  };

  useEffect(() => {
    const linkValue = `${linkDomain}:${linkId}`;
    const changeData = { type: 'INPUT_DOC_DATA', payload: {} };
    changeData.payload.link = linkValue;
    docDispatch(changeData);
  }, [linkDomain, linkId]);

  return (
    <CardBox>
      <CardOwner type="text" placeholder={docData.name} readOnly />

      <CardImgLabel htmlFor="profile">
        <CardImg src={docData.user_image === '' || docData.user_image === 'null' ? noImg : docData.user_image} />
      </CardImgLabel>
      <input style={{ display: 'none' }} type="file" accept="image/*" onChange={profileHandler} id="profile" />

      {cardData.map((item) => (
        <CardDataWrap key={item.name}>
          <CardDataName>{item.name}</CardDataName>
          <CardDataInput
            placeholder={createPlaceHoler(item.key)}
            onChange={dataValueChange}
            id={item.key}
            autoComplete="off"
            value={docData[item.key] === 'null' || !docData[item.key] ? '' : docData[item.key]}
          />
        </CardDataWrap>
      ))}

      <CardDataWrap>
        <CardDataName>MBTI</CardDataName>
        <MbtiSelector
          value={docData.mbti === 'null' || docData.mbti === null ? 'default' : docData.mbti}
          onChange={dataValueChange}
          id="mbti"
        >
          <option value="default" disabled style={{ color: '#888888' }}>
            선택하세요
          </option>
          {MBTI.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </MbtiSelector>
      </CardDataWrap>

      <CardDataWrap>
        <CardDataName>링크</CardDataName>
        <LinkSelect
          onChange={(e) => {
            setLinkDomain(e.target.value);
          }}
          value={linkDomain}
        >
          <option value="instagram">인스타</option>
          <option value="github">깃허브</option>
        </LinkSelect>
        <LinkSelectDomain>{linkDomain}.com/</LinkSelectDomain>
        <LinkDataInput
          placeholder="아이디 입력"
          onChange={(e) => {
            setLinkId(e.target.value);
          }}
          value={linkId}
          id="link"
          autoComplete="off"
        />
      </CardDataWrap>
    </CardBox>
  );
};

const LinkSelect = styled.select`
  height: 34px;
  outline: none;
  border: 1px solid #d7d7d7;
  text-indent: 1px;
  color: #222222;
`;

const LinkSelectDomain = styled.div`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  ${font({ color: '#999', size: '14px', widht: '400' })}
  width: 117px;
  height: 34px;
  background-color: #fff;
  border: 1px solid #d7d7d7;
`;

const CardBox = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center' })};
  width: 350px;
  height: 598px;
  background-color: #ddeeaa;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  font-family: Noto Sans KR;
  font-style: normal;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-top: 20px;
  }
`;

const CardOwner = styled.input`
  width: 350px;
  height: 32px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #ddeeaa;
  border: none;
  margin-bottom: 9px;
  outline: none;
`;

const CardImgLabel = styled.label`
  width: 342px;
  height: 342px;
  margin-bottom: 6px;
`;

const CardImg = styled.img`
  width: 342px;
  height: 342px;
  background: #f6f6f6;

  &:hover {
    cursor: pointer;
  }
`;

const CardDataWrap = styled.div`
  ${flexBox({})}
  width: 348px;
  height: 34px;
`;

const CardDataName = styled.div`
  width: 68px;
  height: 34px;
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })}
`;

const CardDataInput = styled.input`
  width: 278px;
  height: 34px;
  border: 1px solid #d7d7d7;
  text-align: center;
  outline: none;
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

const LinkDataInput = styled.input`
  width: 100px;
  height: 34px;
  border: 1px solid #d7d7d7;
  padding: 5px;
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
  }
`;

const MbtiSelector = styled.select`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })}
  width: 278px;
  height: 34px;
  border: 1px solid #d7d7d7;
  text-align: center;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  color: #222222;
`;

const CardSNS = styled.input`
  width: 278px;
  height: 34px;
  border: 1px solid #d7d7d7;
  background-color: white;
`;

export default DocCard;
