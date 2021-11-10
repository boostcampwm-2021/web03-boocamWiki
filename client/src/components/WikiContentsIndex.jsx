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
  padding: 12px 20px 18px 0;
  border: 2px solid #d7d7d7;
  max-width: 350px;
  margin-top: 20px;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-left: 14px;
`;
const Padd = styled.div`
  margin-top: 12px;
  padding-left: 20px;
`;

const WikiContentsIndex = ({ text, title }) => {
  return (
    <Index>
      <Title> {title}</Title>
      <Padd>
        <ReactMarkdown allowedElements={['h1', 'h2', 'h3']} components={{ h1: 'h2', h2: 'h3', h3: 'h4' }}>
          {text}
        </ReactMarkdown>
      </Padd>
    </Index>
  );
};

export default WikiContentsIndex;
