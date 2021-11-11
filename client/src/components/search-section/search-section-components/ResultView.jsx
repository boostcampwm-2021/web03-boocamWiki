import React from 'react';
import styled from 'styled-components';
import ResultSummary from './ResultSummary';
import ResultContent from './ResultContent';
import ResultFooter from './ResultFooter';

const ResultViewDiv = styled.div`
  padding: 30px 20px;
`;

const ResultView = ({ type, value, result, resultCount }) => {
  return (
    <ResultViewDiv>
      <ResultSummary type={type} value={value} resultCount={resultCount} />
      <ResultContent type={type} value={value} result={result} />
      <ResultFooter resultCount={resultCount} />
    </ResultViewDiv>
  );
};

export default ResultView;
