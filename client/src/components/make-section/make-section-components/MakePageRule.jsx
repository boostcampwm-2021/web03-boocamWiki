import React from "react";
import styled from 'styled-components';
import MdParser from "../../MdParser";
import ruleMd from "./ruleText";

const MakePageRule = () => {
    return (
      <RuleWrap>
        <MdParser content={ruleMd} />
      </RuleWrap>
    )
}

const RuleWrap = styled.div`
  border: 1px solid #888888;
  width: 100%;
  background-color: #F6F6F6;
  margin-top: 30px;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export default MakePageRule;