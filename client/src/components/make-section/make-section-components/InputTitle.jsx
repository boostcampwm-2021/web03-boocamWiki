import { React, useRef, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Classification from './input-title-components/Classification';
import Generation from './input-title-components/Generation';
import BoostCampId from './input-title-components/BoostCampId';
import DocName from './input-title-components/DocName';
import CreateBtn from './input-title-components/CreateBtn';
import { SelectTypeContext } from '../../../App';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { BREAK_POINT_MOBILE } from '../../../magic-number';
import { WordManager } from '../../../resource/message';

const Title = ({ canMake, setCanMake, docData, docDispatch }) => {
  const id = useRef(docData.boostcamp_id);
  const name = useRef(docData.name);
  const { memberType } = useContext(SelectTypeContext);

  const isCamper = ({ member_type }) => {
    return member_type === WordManager.CAMPER;
  };

  const changeData = () => {
    setCanMake();
    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        generation: isCamper(docData) ? docData.generation : 0,
        boostcamp_id: isCamper(docData) ? id.current.value : docData.boostcamp_id,
        name: name.current.value,
      },
    });
  };

  const titleCheckHandler = async () => {
    if (!docData.classification || docData.generation < 0 || !docData.boostcamp_id || !docData.name) {
      setCanMake();
      return;
    }

    const result = await fetch(
      `/api/documents/search?generation=${docData.generation}&boostcamp_id=${docData.boostcamp_id}&name=${docData.name}`,
    );
    const data = await result.json();
    if (data.result.length === 0) setCanMake(true);
    else setCanMake(false);
  };

  const genBtnHandler = ({ target }) => {
    if (target.id === 'up') {
      docDispatch({
        type: 'INPUT_DOC_DATA',
        payload: {
          generation: docData.generation < 1 ? 1 : docData.generation + 1,
        },
      });
    } else {
      if (docData.generation <= 1) return;
      docDispatch({
        type: 'INPUT_DOC_DATA',
        payload: {
          generation: docData.generation - 1,
        },
      });
    }
  };

  const valueDispatch = (generationValue, idValue, nameValue, memberType) => {
    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        generation: generationValue,
        boostcamp_id: idValue,
        name: nameValue,
        member_type: memberType,
        classification: [memberType],
      },
    });
  };

  useEffect(() => {
    if (!memberType) return;
    const boostcamp_id = memberType === WordManager.CAMPER ? '' : WordManager.Eng[memberType];
    valueDispatch(0, boostcamp_id, name.current.value, memberType);
  }, [memberType]);

  return (
    <TitleWrap>
      <Classification memberType={memberType} />
      <DownLine />
      <Generation docData={docData} changeData={changeData} genBtnHandler={genBtnHandler} />
      <DownLine />
      <BoostCampId docData={docData} id={id} changeData={changeData} />
      <DownLine />
      <DocName name={name} changeData={changeData} />
      <CreateBtn titleCheckHandler={titleCheckHandler} canMake={canMake} />
    </TitleWrap>
  );
};

const DownLine = styled.div`
  width: 1px;
  background-color: #d7d7d7;
  height: 44px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    display: none;
  }
`;

const TitleWrap = styled.div`
  ${flexBox({ justifyContent: 'space-between', alignItems: 'center' })};
  ${font({ size: '12px', weight: 'bold' })};
  width: 635px;
  height: 70px;
  background-color: #f6f6f6;
  border: 1px solid #d7d7d7;
  border-radius: 15px;
  margin-top: 20px;
  position: relative;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${flexBox({ direction: 'column', justifyContent: 'space-between', alignItems: 'center' })};
    width: 350px;
    height: fit-content;
    padding-bottom: 5px;
  }
`;

export default Title;
