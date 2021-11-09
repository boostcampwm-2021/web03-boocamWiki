import React from "react";
import styled from "styled-components";
import DocCardPreview from "./DocCardPreview";

const CardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div.cardBox{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 50%;
    border-right: 1px solid #D7D7D7;
  }
  div.preview{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
  }
  width: 1000px;
  height: 500px;
  border: none;
  border-radius: 11px;
  box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 30px;
`;

const DataLabel = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
`;

const DataInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const dataValue = {
  'nickname': { 'name': '별명', 'type': 'INPUT_NICKNAME' },
  'location': { 'name': '지역', 'type': 'INPUT_LOCATION' },
  'language': { 'name': '주언어', 'type': 'INPUT_LANGUAGE' },
  'mbti': { 'name': 'MBTI', 'type': 'INPUT_MBTI' },
  'field': { 'name': '분야', 'type': 'INPUT_FIELD' },
  'link': { 'name': 'SNS 링크', 'type': 'INPUT_LINK' }
}

const dataName = ['nickname', 'location', 'language', 'mbti', 'field', 'link'];

const DocCard = ({docData, dispatch}) => {

  const dataValueChange = (e) => {
    const changeData = { type: dataValue[e.target.id].type }
    changeData[e.target.id] = e.target.value;
    dispatch(changeData);
  }

  return (
    <CardWrap>
      <div className='cardBox'>
        <div>
          <DataLabel>프로필 사진</DataLabel>
          <DataInput type='text' />
        </div>

        {dataName.map((type) => (
          <div>
            <DataLabel>{dataValue[type].name}</DataLabel>
            <DataInput type='text' onChange={dataValueChange} id={type} value={docData.type} />
          </div>
        ))}
      </div>
      <div className='preview'>
        <DocCardPreview docData={docData} />
      </div>
    </CardWrap>
  )
}

export default DocCard;