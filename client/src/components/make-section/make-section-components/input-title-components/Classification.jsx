import React, { useContext } from 'react';
import SelectModal from '../../../select-modal/SelectModal';
import { SelectTgContext } from '../../../../App';
import genDownBtn from '../../../../resource/img/genDownBtn.svg';
import { TextInputWrap, Text, GenWrap, TypeInput, GenBtn } from './style';
import { WordManager } from '../../../../resource/message/words';

const PEOPLE_TYPE = {
  캠퍼: WordManager.CAMPER,
  마스터: WordManager.MASTER,
  운영진: WordManager.MANAGER,
  멘토: WordManager.MENTOR,
  리뷰어: WordManager.REVIEWER,
};

const Classification = ({ memberType }) => {
  const { isPeopleTypeOn } = useContext(SelectTgContext);
  return (
    <TextInputWrap>
      <Text>분류</Text>
      <GenWrap className="TgSelect SelectPeopleType">
        <div style={{ position: 'relative', top: '-40px', left: '-15px' }}>
          <SelectModal
            className="SelectPeopleType"
            content={Object.keys(PEOPLE_TYPE)}
            isSelectOn={isPeopleTypeOn}
            move={{ top: '70px', left: '0px' }}
          />
        </div>
        <TypeInput
          type="text"
          className="TgSelect SelectPeopleType"
          value={memberType}
          placeholder="선택하세요"
          readOnly
          autoComplete="off"
        />
        <GenBtn src={genDownBtn} className="TgSelect SelectPeopleType" id="down" />
      </GenWrap>
    </TextInputWrap>
  );
};

export default Classification;
