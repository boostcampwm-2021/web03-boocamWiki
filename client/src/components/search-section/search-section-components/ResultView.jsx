import React from 'react';
import styled from 'styled-components';
import ResultSummary from './ResultSummary';
import ResultContent from './ResultContent';
import ResultFooter from './ResultFooter';

const ResultView = ({ type, value, result, resultCount, currentPage }) => {
  return (
    <ResultViewDiv>
      <ResultSummary type={type} value={value} resultCount={resultCount} />
      <ResultContent type={type} value={value} result={result} />
      <ResultFooter resultCount={resultCount} currentPage={currentPage} />
    </ResultViewDiv>
  );
};

const ResultViewDiv = styled.div`
  padding: 30px 20px;
`;

export default ResultView;
