import {React, useRef, useState} from "react";
import styled from 'styled-components';
import genDownBtn from '../../../resource/img/genDownBtn.svg';
import genUpBtn from '../../../resource/img/genUpBtn.svg';

const DownLine = styled.div`
  border: 1px solid #D7D7D7;
  width: 0.1px;
  height: 44px;
`;

const TitleWrap = styled.div`
  width: 635px;
  height: 66px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 22px;
  background-color: #F6F6F6;
  border: 1px solid #D7D7D7;
  border-radius: 15px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
`;

const TextInputWrap = styled.div`
  width: 100px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Text = styled.div`
  width: 100px;
  height: 17px;
  color: #E8A20C;
  font-size: 12px;
`;

const CanText = styled.div`
  width: 94px;
  height: 9px;
  color: ${props => props.color};
  font-weight: normal;
  font-size: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100px;
  height: 23px;
  border: none;
  background-color: #F6F6F6;
  outline: none;
  font-size: 16px;
`;

const GenWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GenInput = styled.input`
  width: 80px;
  height: 23px;
  border: none;
  background-color: #F6F6F6;
  outline: none;
  font-size: 16px;
`;

const GenBtnWrap = styled.div`
  width: 12px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GenBtn = styled.img`
  width: 12px;
  height: 6px;
`;

const ValidationBtn = styled.button`
  width: 94px;
  height: 34px;
  background-color: #F45452;;
  color: white;
  border: none;
  border-radius: 11px;
  font-size: 18px;
  margin-right: 10px;
`;

const PeopleTypeSelect = styled.select`
  width: 100px;
  height: 23px;
  font-size: 16px;
  font-weight: normal;
  border: none;
  background-color: #F6F6F6;
`;

const Title = ({ canMake, setCanMake, docData, dispatch }) => {
  const id = useRef(docData.boostcamp_id);
  const name = useRef(docData.name);

  const changeData = () => {
      if(canMake) setCanMake(false);
      dispatch({
          type: 'INPUT_TITLE',
          generation: docData.classification === 'camper' ? docData.generation : 0,
          boostcamp_id: docData.classification === 'camper' ? id.current.value : docData.classification,
          name: name.current.value
      });
  }

  const titleCheckHandler = async () => {
    // if(docData.generation && docData.boostcamp_id && docData.name)
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
    if(peopleType === 'camper') valueDispatch(0, '', name.current.value);
    else if(peopleType === 'master') valueDispatch(0, 'master', name.current.value); 
    else valueDispatch(0, 'manager', name.current.value);

    dispatch({
      type: 'INPUT_CLASSIFICATION',
      classification: peopleType,
    });
  }

  const genBtnHandler = (e) => {
    if(e.target.id === 'up'){
      dispatch({
        type: 'INPUT_GENERATION',
        generation: docData.generation + 1
      })
    } else {
      if(docData.generation - 1 < 1) return;
      dispatch({
        type: 'INPUT_GENERATION',
        generation: docData.generation - 1
      })
    }
  }

  return ( 
    <TitleWrap>
      <TextInputWrap>
        <Text>분류</Text>
        <PeopleTypeSelect onChange={peopleTypeHandler} value={docData.classification}>
          <option value='camper'>캠퍼</option>
          <option value='master'>마스터</option>
          <option value='manager'>운영진</option>
        </PeopleTypeSelect>
      </TextInputWrap>

      <DownLine />

      <TextInputWrap>
        <Text>기수</Text>
        <GenWrap>
          {
            docData.classification === 'camper' && 
            <>
              <GenInput type='text' onChange={changeData} placeholder={docData.generation !== 0 ? docData.generation : '선택하세요'} readOnly/>
              <GenBtnWrap>
                <GenBtn src={genUpBtn} id='up' onClick={genBtnHandler} />
                <GenBtn src={genDownBtn} id='down' onClick={genBtnHandler} />
              </GenBtnWrap>
            </>
          }
          {
            docData.classification === 'master' &&
            <GenInput type='text' onChange={changeData} placeholder='MASTER' readOnly/>
          }
          {
            docData.classification === 'manager' &&
            <GenInput type='text' onChange={changeData} placeholder='MANAGER' readOnly/>
          }
        </GenWrap>
      </TextInputWrap>

      <DownLine />

      <TextInputWrap>
        <Text>아이디</Text>
        {docData.classification === 'camper' && <Input type='text' ref={id} onChange={changeData} placeholder='입력하세요' />}
        {docData.classification === 'master' && <Input type='text' ref={id} onChange={changeData} placeholder='MASTER' readOnly />}
        {docData.classification === 'manager' && <Input type='text' ref={id} onChange={changeData} placeholder='MANAGER' readOnly />}
      </TextInputWrap>

      <DownLine />
      
      <TextInputWrap>
        <Text>이름</Text>
        <Input type='text' ref={name} onChange={changeData} placeholder='입력하세요' />
      </TextInputWrap>


      <TextInputWrap>
        <ValidationBtn onClick={titleCheckHandler}>생성 확인</ValidationBtn>
        { canMake ? <CanText color='#0055FB'>생성 가능</CanText> : <CanText color='#F45452'>생성 불가능</CanText> }
      </TextInputWrap>
      
    </TitleWrap>
  )
}

export default Title;