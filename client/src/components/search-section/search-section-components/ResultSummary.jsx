import React from 'react';

const searchTypeMap = {
  generation: '기수',
  boostcamp_id: '캠퍼번호',
  name: '이름',
  content: '내용',
};

const ResultSummary = ({ type, value, result }) => {
  return (
    <div>
      {searchTypeMap[type]}: {`${`'${value}'`}`}에 대한 {result.length}건
    </div>
  );
};

export default ResultSummary;
