import React from 'react';
import genDownBtn from '../../../../resource/img/genDownBtn.svg';
import genUpBtn from '../../../../resource/img/genUpBtn.svg';
import { WordManager } from '../../../../resource/message';
import { TextInputWrap, Text, GenWrap, GenInput, GenBtnWrap, GenBtn } from './style';

const Generation = ({ docData, changeData, genBtnHandler }) => {
  return (
    <TextInputWrap>
      <Text>기수</Text>
      <GenWrap>
        {docData.member_type === WordManager.CAMPER ? (
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
        ) : (
          <GenInput type="text" placeholder="ALL" readOnly />
        )}
      </GenWrap>
    </TextInputWrap>
  );
};

export default Generation;
