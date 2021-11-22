import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeIndex from 'rehype-indexes';
import styled from 'styled-components';

const MdParser = ({ content }) => {
  const clickHandler = ({ target }) => {
    const img = target.closest('img');
    if (img) {
      window.open(img.src);
    }
  };
  return (
    <MdParserContainer onClick={clickHandler}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeIndex, { mode: 'document' }]]}>
        {content}
      </ReactMarkdown>
    </MdParserContainer>
  );
};

const MdParserContainer = styled.div`
  height: 100%;

  img {
    max-width: 100%;
    &:hover {
      cursor: pointer;
    }
  }

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
    a,
    a:visited,
    a:link,
    a:hover,
    a:visited {
      text-decoration: none;
      color: #0055fb;
    }
  }
`;

export default MdParser;
