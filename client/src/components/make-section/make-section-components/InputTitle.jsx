import {React, useRef, useState} from "react";
import styled from 'styled-components';

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: none;
  border-radius: 11px;
  margin-top: 10px;
  width: 90%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
  margin-bottom: 20px;
`;

const TextInputWrap = styled.div`
  
`;

const DownLine = styled.div`
  border: 1px solid gray;
  width: 0.1px;
  height: 40px;
`;

const Text = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  outline: none;
`;

const ValidationBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #0055FB;
  color: white;
  border: none;
  border-radius: 11px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const PeopleTypeSelect = styled.select`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const Title = ({ canMake, setCanMake, docData, dispatch }) => {
  const generation = useRef(docData.generation);
  const id = useRef(docData.boostcamp_id);
  const name = useRef(docData.name);

  const changeData = () => {
      if(canMake) setCanMake(false);
      dispatch({
          type: 'INPUT_TITLE',
          generation: docData.classification === 'camper' ? generation.current.value : 0,
          boostcamp_id: docData.classification === 'camper' ? id.current.value : docData.classification,
          name: name.current.value
      });
  }

  const titleCheckHandler = async () => {
      const result = await fetch(`/documents/search?generation=${docData.generation}&boostcamp_id=${docData.boostcamp_id}&name=${docData.name}`);
      const data = await result.json();
      if(data.result.length === 0) setCanMake(true);
      else setCanMake(false);
  }

  const valueDispatch = (generationValue, idValue, nameValue) => {
    dispatch({
      type: 'INPUT_TITLE',
      generation: generationValue,
      boostcamp_id: idValue,
      name: nameValue
    });
  }

  const peopleTypeHandler = (e) => {
    const peopleType = e.target.value;
    if(peopleType === 'camper') valueDispatch('', '', name.current.value);
    else if(peopleType === 'master') valueDispatch(0, 'master', name.current.value); 
    else valueDispatch(0, 'manager', name.current.value);

    dispatch({
      type: 'INPUT_CLASSIFICATION',
      classification: peopleType,
    });
  }

  return ( 
    <TitleWrap>
      <PeopleTypeSelect onChange={peopleTypeHandler} value={docData.classification}>
        <option value='camper'>캠퍼</option>
        <option value='master'>마스터</option>
        <option value='manager'>운영진</option>
      </PeopleTypeSelect>

      <DownLine />

      {docData.classification === 'camper' ? 
      <>
        <TextInputWrap>
          <Text>기수</Text>
          <Input type='text' ref={generation} onChange={changeData} />
        </TextInputWrap>
        <DownLine />
      </>
      : <></> }

      {docData.classification === 'camper' ? 
      <>
        <TextInputWrap>
          <Text>아이디</Text>
          <Input type='text' ref={id} onChange={changeData} />
        </TextInputWrap>
        <DownLine />
      </>
      : <></> }
      
      <TextInputWrap>
        <Text>이름</Text>
        <Input type='text' ref={name} onChange={changeData} />
      </TextInputWrap>

      <DownLine />

      <ValidationBtn onClick={titleCheckHandler}>생성 확인</ValidationBtn>

      <DownLine />
      { canMake ? <canMakeColor>생성 가능</canMakeColor> : <canMakeColor>생성 불가</canMakeColor> }
    </TitleWrap>
  )
}

export default Title;