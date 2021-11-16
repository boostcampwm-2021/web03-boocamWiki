import React from "react";
import { TextInputWrap, Text, Input } from "./style";

const BoostCampId = ({docData, id, changeData}) => {
  return (
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
  )
}

export default BoostCampId;