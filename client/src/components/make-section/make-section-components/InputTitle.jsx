import { React, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import genDownBtn from '../../../resource/img/genDownBtn.svg';
import genUpBtn from '../../../resource/img/genUpBtn.svg';
import SelectModal from '../../select-modal/SelectModal';
import { SelectTgContext, SelectTypeContext } from '../../../App';

const DownLine = styled.div`
  border: 1px solid #d7d7d7;
  width: 0.1px;
  height: 44px;
`;

const TitleWrap = styled.div`
  width: 635px;
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  border: 1px solid #d7d7d7;
  border-radius: 15px;
  margin-top: 20px;
  position: relative;

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
  margin-left: 15px;
`;

const Text = styled.div`
  width: 100px;
  height: 17px;
  color: #e8a20c;
  font-size: 12px;
`;

const CanText = styled.div`
  width: 94px;
  height: 9px;
  color: ${(props) => props.color};
  font-weight: normal;
  font-size: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100px;
  height: 23px;
  border: none;
  background-color: #f6f6f6;
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
  background-color: #f6f6f6;
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
  &:hover {
    cursor: pointer;
  }
`;

const ValidationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ValidationBtn = styled.button`
  width: 94px;
  height: 34px;
  background-color: #f45452;
  color: white;
  border: none;
  border-radius: 11px;
  font-size: 18px;
  margin-left: 15px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const PeopleTypeSelect = styled.select`
  width: 93px;
  height: 23px;
  font-size: 15px;
  font-weight: normal;
  border: none;
  background-color: #f6f6f6;
  color: #888888;
  outline: none;
`;

const Title = ({ canMake, setCanMake, docData, dispatch }) => {
  const id = useRef(docData.boostcamp_id);
  const name = useRef(docData.name);
  const { memberType } = useContext(SelectTypeContext);
  const { isPeopleTypeOn } = useContext(SelectTgContext);

  const changeData = () => {
    if (canMake) setCanMake(false);
    dispatch({
      type: 'INPUT_TITLE',
      generation: docData.classification === 'camper' ? docData.generation : 0,
      boostcamp_id: docData.classification === 'camper' ? id.current.value : docData.classification,
      name: name.current.value,
    });
  };

  const titleCheckHandler = async () => {
    const result = await fetch(
      `/documents/search?generation=${docData.generation}&boostcamp_id=${docData.boostcamp_id}&name=${docData.name}`,
    );
    const data = await result.json();
    if (data.result.length === 0) setCanMake(true);
    else setCanMake(false);
  };

  const valueDispatch = (generationValue, idValue, nameValue) => {
    dispatch({
      type: 'INPUT_TITLE',
      generation: generationValue,
      boostcamp_id: idValue,
      name: nameValue,
    });
  };

  const peopleTypeHandler = (e) => {
    const peopleType = e.target.value;
    if (peopleType === 'camper') valueDispatch(0, '', name.current.value);
    else if (peopleType === 'master') valueDispatch(0, 'master', name.current.value);
    else valueDispatch(0, 'manager', name.current.value);

    dispatch({
      type: 'INPUT_CLASSIFICATION',
      classification: peopleType,
    });
  };

  const genBtnHandler = (e) => {
    if (e.target.id === 'up') {
      dispatch({
        type: 'INPUT_GENERATION',
        generation: docData.generation + 1,
      });
    } else {
      if (docData.generation - 1 < 1) return;
      dispatch({
        type: 'INPUT_GENERATION',
        generation: docData.generation - 1,
      });
    }
  };

  return (
    <TitleWrap>
      <TextInputWrap>
        <Text>분류</Text>
        <GenWrap className="TgSelect SelectPeopleType">
          <GenInput
            type="text"
            className="TgSelect SelectPeopleType"
            value={memberType}
            placeholder="선택하세요"
            readOnly
            autoComplete="off"
          />
          <GenBtn src={genDownBtn} className="TgSelect SelectPeopleType" id="down" />
        </GenWrap>
        <SelectModal
          className="SelectPeopleType"
          content={['캠퍼', '마스터', '운영진']}
          isSelectOn={isPeopleTypeOn}
          move={{ top: '70px', left: '0px' }}
        />
      </TextInputWrap>

      <DownLine />

      <TextInputWrap>
        <Text>기수</Text>
        <GenWrap>
          {docData.classification === 'camper' && (
            <>
              <GenInput
                type="text"
                onChange={changeData}
                placeholder={docData.generation !== 0 ? docData.generation : '선택하세요'}
                readOnly
                autoComplete="off"
              />
              <GenBtnWrap>
                <GenBtn src={genUpBtn} id="up" onClick={genBtnHandler} />
                <GenBtn src={genDownBtn} id="down" onClick={genBtnHandler} />
              </GenBtnWrap>
            </>
          )}
          {docData.classification !== 'camper' && <GenInput type="text" placeholder="ALL" readOnly />}
        </GenWrap>
      </TextInputWrap>

      <DownLine />

      <TextInputWrap>
        <Text>아이디</Text>
        {docData.classification === 'camper' && (
          <Input type="text" ref={id} onChange={changeData} placeholder="입력하세요" />
        )}
        {docData.classification === 'master' && (
          <Input type="text" ref={id} onChange={changeData} placeholder="MASTER" readOnly />
        )}
        {docData.classification === 'manager' && (
          <Input type="text" ref={id} onChange={changeData} placeholder="MANAGER" readOnly />
        )}
      </TextInputWrap>

      <DownLine />

      <TextInputWrap>
        <Text>이름</Text>
        <Input type="text" ref={name} onChange={changeData} placeholder="입력하세요" className="nameInput" />
      </TextInputWrap>

      <ValidationWrap>
        <ValidationBtn onClick={titleCheckHandler}>생성 확인</ValidationBtn>
        {canMake ? <CanText color="#0055FB">생성 가능</CanText> : <CanText color="#F45452">생성 불가능</CanText>}
      </ValidationWrap>
    </TitleWrap>
  );
};

export default Title;
