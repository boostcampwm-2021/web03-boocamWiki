import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styled from 'styled-components';

const MdParserContainer = styled.div`
  height: 100%;

  & {
    padding: 5px 20px;
    li {
      margin: 5px 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 20px 0 10px 0;
    }

    h1,
    h2 {
      padding-bottom: 5px;
      border-bottom: 1px solid #d7d7d7;
    }

    ul,
    ol {
      margin-top: 10px;
      padding-inline-start: 30px;
    }
  }
`;

const MdParser = ({ content }) => {
  return (
    <MdParserContainer>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </MdParserContainer>
  );
};

export default MdParser;
