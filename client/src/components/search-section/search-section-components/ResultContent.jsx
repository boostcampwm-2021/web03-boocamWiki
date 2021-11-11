import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { Utils } from '../../../utils';

const ContentContainer = styled.div`
  margin: 10px 0px;
`;

const ResultContainer = styled.div`
  padding: 15px 0px;
  ${(props) => (props.idx === 0 ? 'border-top: 1px solid #d7d7d7;' : '')}
  border-bottom: 1px solid #d7d7d7;

  :hover {
    background-color: #f6f6f6;
  }
`;

const ResultTitleDiv = styled.div`
  margin-bottom: 5px;
`;

const ResultTitle = styled.span`
  color: #222222;
  font-size: 20px;
  font-weight: 500;
`;

const ResultContentPreview = styled.div`
  color: #888888;
  font-size: 16px;
  font-weight: 500;
  max-height: calc(16px * 6);
  white-space: normal;
  overflow: hidden;
`;

const Highlight = styled.span`
  color: #69a64c;
  text-decoration: underline;
`;

const ResultLink = styled(Link)`
  text-decoration: none;
  outline: none;

  :hover,
  :active {
    text-decoration: none;
  }
`;

const ResultContent = ({ type, value, result }) => {
  const [renderResult, setRenderResult] = useState(result);
  useEffect(async () => {
    if (!result) {
      return;
    }
    const filteredResult = await Promise.all(
      result.map(async ({ content, ...props }) => {
        return {
          content: await remark()
            .use(strip)
            .process(content)
            .then((file) => file.value),
          ...props,
        };
      }),
    );
    setRenderResult(filteredResult);
  }, [result]);

  return (
    <ContentContainer>
      {renderResult &&
        renderResult.map(({ generation, boostcamp_id: boostcampId, name, content }, idx) => (
          <ResultLink to={`/w/${generation}_${boostcampId}_${name}`} key={`${generation}_${boostcampId}_${name}`}>
            <ResultContainer idx={idx}>
              <ResultTitleDiv>
                <ResultTitle>{Utils.docTitleGen({ generation, boostcampId, name }, 1)}</ResultTitle>
              </ResultTitleDiv>
              <div>
                <ResultContentPreview>
                  <span>
                    {type !== 'content'
                      ? content
                      : content
                          .split(new RegExp(`(${value})`))
                          .map((part) =>
                            part === value ? <Highlight key={part}>{part}</Highlight> : <span key={part}>{part}</span>,
                          )}
                  </span>
                </ResultContentPreview>
              </div>
            </ResultContainer>
          </ResultLink>
        ))}
    </ContentContainer>
  );
};

export default ResultContent;
