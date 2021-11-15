import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import rehypeIndexes from 'rehype-indexes';

const Index = styled.div`
  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    width: fit-content;
    display: block;
    margin: 0px;
  }
  h1 {
    padding-left: 0px;
  }
  h2 {
    padding-left: 20px;
  }
  h3 {
    padding-left: 40px;
  }
  a {
    margin-right: 4px;
  }
  padding: 12px 20px 18px 0;
  border: 2px solid #d7d7d7;
  max-width: 350px;
  height: fit-content;
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
        <ReactMarkdown rehypePlugins={[rehypeIndexes]}>{text}</ReactMarkdown>
      </Padd>
    </Index>
  );
};

export default WikiContentsIndex;
