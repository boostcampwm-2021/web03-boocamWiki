import React from "react";
import styled from "styled-components";
import DocCardPreview from "./DocCardPreview";
import noImg from '../../../resource/img/no-image.png';

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 598px;
  background-color: #DDEEAA;

  font-family: Noto Sans KR;
  font-style: normal;
`;

const CardOwner = styled.input`
  width: 350px;
  height: 32px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #DDEEAA;
  border: none;
  margin-bottom: 9px;
  outline: none;
`;

const CardImg = styled.img`
  width: 342px;
  height: 342px;
  background: #F6F6F6;
  margin-bottom: 6px;

  &:hover {
    cursor: pointer;
  }
`;

const CardDataWrap = styled.div`
  display: flex;
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

const CardDataInput = styled.input`
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  text-align: center;
  outline: none;
`;

const MbtiSelector = styled.select`
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  text-align: center;
  outline: none;
  display: flex;
  justify-content: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  color: #888888;
`;

const CardSNS = styled.input`
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  background-color: white;
`;

const cardData = [
  {name: '별명', key: 'nickname'},
  {name: '지역', key: 'location'},
  {name: '주언어', key: 'language'},
  {name: '분야', key: 'field'},
  {name: '링크', key: 'link'}
]

const dataValue = {
  'nickname': { 'name': '별명', 'type': 'INPUT_NICKNAME' },
  'location': { 'name': '지역', 'type': 'INPUT_LOCATION' },
  'language': { 'name': '주언어', 'type': 'INPUT_LANGUAGE' },
  'mbti': { 'name': 'MBTI', 'type': 'INPUT_MBTI' },
  'field': { 'name': '분야', 'type': 'INPUT_FIELD' },
  'link': { 'name': '링크', 'type': 'INPUT_LINK' }
}

const MBTI = ['ISTJ', 'ISTP', 'ESTP', 'ESTJ', 'ISFJ', 'ISFP', 'ESFP', 'ESFJ', 'INFJ', 'INFP', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ'];

const DocCard = ({docData, dispatch}) => {

  const dataValueChange = (e) => {
    const changeData = { type: dataValue[e.target.id].type }
    changeData[e.target.id] = e.target.value;
    dispatch(changeData);
  }

  return (
    <CardBox>

      <CardOwner type='text' placeholder='이름을 입력하세요' />

      <CardImg src={docData.user_image !== null ? docData.user_image : noImg} />

      {cardData.map((item) => (
        <CardDataWrap key={item.name}>
          <CardDataName>{item.name}</CardDataName>
          <CardDataInput placeholder='입력하세요'>{docData[item.key]}</CardDataInput>
        </CardDataWrap>
      ))}

      <CardDataWrap>
        <CardDataName>MBTI</CardDataName>
        <MbtiSelector defaultValue='default'>
          <option value='default' disabled style={{color: '#888888'}}>선택하세요</option>
          {MBTI.map((type) => (<option key={type} value={type}>{type}</option>))}
        </MbtiSelector>
      </CardDataWrap>
      
    </CardBox>
  )
}

export default DocCard;