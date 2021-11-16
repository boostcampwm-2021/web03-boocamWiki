import React, { useEffect } from "react";
import styled from "styled-components";
import { BREAK_POINT_MOBILE } from '../../../magic-number';
import noImg from '../../../resource/img/no-image.png';
import { flexBox } from "../../../styles/styled-components/mixin";

const cardData = [
  {name: '별명', key: 'nickname'},
  {name: '지역', key: 'location'},
  {name: '주언어', key: 'language'},
  {name: '분야', key: 'field'},
  {name: '링크', key: 'link'}
]

const MBTI = ['ISTJ', 'ISTP', 'ESTP', 'ESTJ', 'ISFJ', 'ISFP', 'ESFP', 'ESFJ', 'INFJ', 'INFP', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ'];

const DocCard = ({docData, docDispatch}) => {

  const dataValueChange = (e) => {
    const changeData = { type: 'INPUT_DOC_DATA', payload: {} }
    changeData.payload[e.target.id] = e.target.value;
    docDispatch(changeData);
  }

  return (
    <CardBox>

      <CardOwner type='text' placeholder={docData.name} readOnly />

      <CardImg src={(docData.user_image === null || docData.user_image === 'null') ? noImg : docData.user_image} />

      {cardData.map((item) => (
        <CardDataWrap key={item.name}>
          <CardDataName>{item.name}</CardDataName>
          <CardDataInput 
            placeholder='입력하세요'
            onChange={dataValueChange} 
            id={item.key}
            autoComplete='off' 
            value={(docData[item.key] === 'null' || !docData[item.key]) ? '' : docData[item.key]} />
        </CardDataWrap>
      ))}

      <CardDataWrap>
        <CardDataName>MBTI</CardDataName>
        <MbtiSelector value={(docData.mbti === 'null' || docData.mbti === null) ? 'default' : docData.mbti} onChange={dataValueChange} id='mbti'>
          <option value='default' disabled style={{color: '#888888'}}>선택하세요</option>
          {MBTI.map((type) => (<option key={type} value={type}>{type}</option>))}
        </MbtiSelector>
      </CardDataWrap>
      
    </CardBox>
  )
}

const CardBox = styled.div`
  ${flexBox({direction: 'column', alignItems: 'center'})};
  width: 350px;
  height: 598px;
  background-color: #DDEEAA;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  font-family: Noto Sans KR;
  font-style: normal;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px){
    margin-top: 20px;
  }
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
  ${flexBox({})}
  width: 348px;
  height: 34px;
`;

const CardDataName = styled.div`
  width: 68px;
  height: 34px;
  ${flexBox({justifyContent: 'center', alignItems: 'center'})}
`;

const CardDataInput = styled.input`
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  text-align: center;
  outline: none;
  &:focus::-webkit-input-placeholder {color:transparent; }
`;

const MbtiSelector = styled.select`
  ${flexBox({justifyContent: 'center', alignItems: 'center'})}
  width: 278px;
  height: 34px;
  border: 1px solid #D7D7D7;
  text-align: center;
  outline: none;
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

export default DocCard;