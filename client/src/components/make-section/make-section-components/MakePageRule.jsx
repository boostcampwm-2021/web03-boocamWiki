import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";
import ruleMd from "./ruleText";

const RuleWrap = styled.div`
  border: 1px solid red;
  width: 1000px;
  height: 570px;
`;

const MakePageRule = () => {
    return (
      <RuleWrap>
        <MdParser content={ruleMd} />
      </RuleWrap>
    )
}

export default MakePageRule;