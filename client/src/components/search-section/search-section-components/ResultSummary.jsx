import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SummaryDiv = styled.div`
  color: #222222;
  font-size: 20px;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: #0055fb;
  font-size: 10px;
  text-decoration: none;
  outline: none;

  :hover,
  :active {
    text-decoration: none;
  }
`;

const FooterSpan = styled.span`
  color: #222222;
  font-size: 10px;
`;

const searchTypeMap = {
  generation: '기수',
  boostcamp_id: '캠퍼번호',
  name: '이름',
  content: '내용',
};

const ResultSummary = ({ type, value, resultCount }) => {
  return (
    <div>
      <SummaryDiv>
        {searchTypeMap[type]}: {`${`'${value}'`}`}에 대한 {resultCount}건
      </SummaryDiv>
      <div>
        <FooterSpan>원하는 문서가 없으신가요? </FooterSpan>
        <StyledLink to="/makedocs">[문서 작성]</StyledLink>
        <FooterSpan>을 통하여 작성하실 수 있습니다.</FooterSpan>
      </div>
    </div>
  );
};

export default ResultSummary;
