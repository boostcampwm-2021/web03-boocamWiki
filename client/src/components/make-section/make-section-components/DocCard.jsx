import React from "react";
import styled from "styled-components";

const InputWrap = styled.div`
  display: flex;
`;

const DataLabel = styled.div``;

const DataInput = styled.input``;

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
    <>
      <InputWrap>
        <DataLabel>프로필 사진</DataLabel>
        <DataInput type='text' />
        <input type='button' value='사진 추가'/>
      </InputWrap>

      {dataName.map((type) => (
        <InputWrap>
          <DataLabel>{dataValue[type].name}</DataLabel>
          <DataInput type='text' onChange={dataValueChange} id={type} value={docData.type} />
        </InputWrap>
      ))}

      {/* <InputWrap>
        <DataLabel>별명</DataLabel>
        <DataInput type='text' />
      </InputWrap>
      <InputWrap>
        <DataLabel>지역</DataLabel>
        <DataInput type='text' />
      </InputWrap>
      <InputWrap>
        <DataLabel>주언어</DataLabel>
        <DataInput type='text' />
      </InputWrap>
      <InputWrap>
        <DataLabel>MBTI</DataLabel>
        <DataInput type='text' />
      </InputWrap>
      <InputWrap>
        <DataLabel>분야</DataLabel>
        <DataInput type='text' />
      </InputWrap>
      <InputWrap>
        <DataLabel>SNS</DataLabel>
        <DataInput type='text' />
      </InputWrap> */}
    </>
  )
}

export default DocCard;