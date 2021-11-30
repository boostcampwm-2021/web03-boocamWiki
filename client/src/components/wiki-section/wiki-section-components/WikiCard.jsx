import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexBox, font } from '@styles/styled-components/mixin';
import github from '@resource/img/github.png';
import instagram from '@resource/img/instagram.png';

const cardData = [
  { name: '별명', key: 'nickname' },
  { name: '지역', key: 'location' },
  { name: '주언어', key: 'language' },
  { name: 'MBTI', key: 'mbti' },
  { name: '분야', key: 'field' },
];

function isEmpty(str) {
  const result = !str || str.length === 0 || str === 'null';
  return result;
}

const WikiCard = ({ docData, name }) => {
  const [domain, id] = !docData.link ? ['instagram', ''] : docData.link.split(':');
  const [card, setCard] = useState(false);

  useEffect(() => {
    if (!isEmpty(docData.user_image)) setCard(true);
    else if (!isEmpty(docData.nickname)) setCard(true);
    else if (!isEmpty(docData.location)) setCard(true);
    else if (!isEmpty(docData.language)) setCard(true);
    else if (!isEmpty(docData.mbti)) setCard(true);
    else if (!isEmpty(docData.field)) setCard(true);
    else if (!isEmpty(docData.link)) setCard(true);
    else setCard(false);
  }, [docData]);

  return (
    <CardBox background={card ? '#DDEEAA' : 'white'} display={card ? 'block' : 'none'}>
      {card && <CardOwner>{name}</CardOwner>}
      {!isEmpty(docData.user_image) && (
        <a href={docData.user_image} target="_blank" rel="noreferrer">
          <CardImg src={docData.user_image} />
        </a>
      )}
      {cardData.map(
        (item) =>
          !isEmpty(docData[item.key]) && (
            <CardDataWrap key={item.name}>
              <CardDataName>{item.name}</CardDataName>
              <CardDataText>{docData[item.key]}</CardDataText>
            </CardDataWrap>
          ),
      )}
      {id && (
        <CardDataWrap key="링크">
          <CardDataName>링크</CardDataName>
          <CardDataText>
            <Link to={{ pathname: `https://${domain}.com/${id}` }} target="_blank" style={{ textDecoration: 'none' }}>
              <LinkContainer>
                <LinkImg src={domain === 'instagram' ? instagram : github} alt="link-img" />
                <LinkTxt>{id}</LinkTxt>
              </LinkContainer>
            </Link>
          </CardDataText>
        </CardDataWrap>
      )}
    </CardBox>
  );
};

const LinkContainer = styled.div`
  ${flexBox({ alignItems: 'center' })};
`;

const LinkImg = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 10px;
`;

const LinkTxt = styled.p`
  ${font({ color: '#888888', size: '16px' })};
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: fit-content;
  background-color: ${(props) => props.background};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: ${(props) => props.display};

  font-family: Noto Sans KR;
  font-style: normal;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CardOwner = styled.div`
  width: 350px;
  height: 32px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #ddeeaa;
  border: none;
  margin-bottom: 9px;
`;

const CardImg = styled.img`
  width: 342px;
  height: 342px;
  background: #f6f6f6;
  margin-bottom: 6px;
  margin-left: 4px;
`;

const CardDataWrap = styled.div`
  display: flex;
  align-items: center;
  width: 348px;
  height: 34px;
`;

const CardDataName = styled.div`
  width: 68px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardDataText = styled.div`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  width: 278px;
  height: 34px;
  border: 1px solid #d7d7d7;
  background-color: white;
  outline: none;
`;

export default WikiCard;
