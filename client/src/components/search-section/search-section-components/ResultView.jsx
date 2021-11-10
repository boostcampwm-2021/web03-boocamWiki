import React from 'react';
import ResultSummary from './ResultSummary';
import ResultContent from './ResultContent';
import ResultFooter from './ResultFooter';

const ResultView = ({ type, value, result }) => {
  return (
    <div>
      <ResultSummary type={type} value={value} result={result} />
      <ResultContent result={result} />
      <ResultFooter />
    </div>
  );
};

export default ResultView;
