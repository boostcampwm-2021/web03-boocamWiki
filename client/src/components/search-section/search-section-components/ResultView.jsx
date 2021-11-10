import React from 'react';
import styled from 'styled-components';
import ResultSummary from './ResultSummary';
import ResultContent from './ResultContent';
import ResultFooter from './ResultFooter';

const ResultViewDiv = styled.div`
  padding: 30px 20px;
  background-color: #fcfcfc;
`;

const ResultView = ({ type, value, result }) => {
  return (
    <ResultViewDiv>
      <ResultSummary type={type} value={value} result={result} />
      <ResultContent result={result} />
      <ResultFooter result={result} />
    </ResultViewDiv>
  );
};

export default ResultView;
