import React, { useContext } from "react";
import SelectModal from '../../../select-modal/SelectModal';
import { SelectTgContext } from '../../../../App';
import genDownBtn from '../../../../resource/img/genDownBtn.svg';
import { TextInputWrap, Text, GenWrap, TypeInput, GenBtn } from "./style";

const PEOPLE_TYPE = {
  '캠퍼': 'camper',
  '마스터': 'master',
  '운영진': 'manager',
}

const Classification = ({ memberType }) => {
  const { isPeopleTypeOn } = useContext(SelectTgContext);
  return (
    <TextInputWrap>
        <Text>분류</Text>
        <GenWrap className="TgSelect SelectPeopleType">
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
        <SelectModal
          className="SelectPeopleType"
          content={Object.keys(PEOPLE_TYPE)}
          isSelectOn={isPeopleTypeOn}
          move={{ top: '70px', left: '0px' }}
        />
      </TextInputWrap>
  )
}

export default Classification;