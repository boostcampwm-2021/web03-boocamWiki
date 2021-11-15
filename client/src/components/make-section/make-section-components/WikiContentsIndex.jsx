import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Index = styled.div`
  h2,
  h3,
  h4 {
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    width: fit-content;
    display: block;
    margin: 0px;
  }
  h2 {
    padding-left: 0px;
  }
  h3 {
    padding-left: 20px;
  }
  h4 {
    padding-left: 40px;
  }
  padding: 14px 20px;
  border: 2px solid #d7d7d7;
  width: 350px;
  height: fit-content;
  min-height: 598px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #222222;
`;
const Padd = styled.div`
  margin-top: 12px;
  padding-left: 20px;
  width: 290px;
  white-space: normal;
  word-wrap: normal;
`;

const WikiContentsIndex = ({ text, title }) => {
  return (
    <Index>
      <Title>{title}</Title>
      <Padd>
        <ReactMarkdown allowedElements={['h1', 'h2', 'h3']} components={{ h1: 'h2', h2: 'h3', h3: 'h4' }}>
          {text}
        </ReactMarkdown>
      </Padd>
    </Index>
  );
};

export default WikiContentsIndex;
