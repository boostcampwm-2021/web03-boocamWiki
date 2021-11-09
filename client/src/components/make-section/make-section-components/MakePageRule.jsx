import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";
import ruleMd from "./ruleText";

const RuleWrap = styled.div`
  border: 1px solid #888888;
  width: 1000px;
  height: 570px;
  background-color: #F6F6F6;
  margin-top: 30px;
`;

const MakePageRule = () => {
    return (
      <RuleWrap>
        <MdParser content={ruleMd} />
      </RuleWrap>
    )
}

export default MakePageRule;