import React from 'react';
import { Link } from 'react-router-dom';

const ResultFooter = () => {
  return (
    <div>
      <span>원하는 문서가 없으신가요?</span>
      <Link to="/makedocs">[문서 작성]</Link>
      <span>을 통하여 작성하실 수 있습니다.</span>
    </div>
  );
};
export default ResultFooter;
