import React from 'react';
import genDownBtn from '@resource/img/genDownBtn.svg';
import genUpBtn from '@resource/img/genUpBtn.svg';
import { WordManager } from '@resource/message';
import { TextInputWrap, Text, GenWrap, GenInput, GenBtnWrap, GenBtn } from './style';

const Generation = ({ docData, changeData, genBtnHandler }) => {
  const { generation } = docData;
  return (
    <TextInputWrap>
      <Text>기수</Text>
      <GenWrap>
        {docData.member_type === WordManager.CAMPER && (
          <>
            <GenInput
              type="text"
              onChange={changeData}
              value={generation < 1 ? '' : generation}
              placeholder="선택하세요"
              readOnly
            />
            <GenBtnWrap>
              <GenBtn src={genUpBtn} id="up" onClick={genBtnHandler} />
              <GenBtn src={genDownBtn} id="down" onClick={genBtnHandler} />
            </GenBtnWrap>
          </>
        )}
        {docData.member_type !== WordManager.CAMPER && <GenInput type="text" placeholder="ALL" readOnly />}
      </GenWrap>
    </TextInputWrap>
  );
};

export default Generation;
