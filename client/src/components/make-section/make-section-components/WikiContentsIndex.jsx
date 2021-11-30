import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import rehypeIndexes from 'rehype-indexes';
import { font } from '@styles/styled-components/mixin';

const WikiContentsIndex = ({ text, title }) => {
  return (
    <Index>
      <Title>{title}</Title>
      <Padd>
        <ReactMarkdown rehypePlugins={[rehypeIndexes]}>{text}</ReactMarkdown>
      </Padd>
    </Index>
  );
};

const Index = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${font({ size: '16px', weight: '400' })};
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
  h4 {
    padding-left: 60px;
  }
  h5 {
    padding-left: 60px;
  }
  h6 {
    padding-left: 60px;
  }
  a,
  a:visited,
  a:link,
  a:hover,
  a:visited {
    margin-right: 4px;
    text-decoration: none;
    color: #0055fb;
  }
  padding: 14px 20px;
  border: 2px solid #d7d7d7;
  width: 350px;
  height: fit-content;
`;

const Title = styled.div`
  ${font({ size: '20px', weight: '500' })};
`;
const Padd = styled.div`
  margin-top: 12px;
  width: 290px;
  white-space: normal;
  word-wrap: normal;
`;

export default WikiContentsIndex;
