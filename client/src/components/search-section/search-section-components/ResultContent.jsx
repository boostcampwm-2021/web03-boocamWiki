import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { remark } from 'remark';
import strip from 'strip-markdown';

const ContentContainer = styled.div`
  margin: 10px 0px;
`;

const ResultContainer = styled.div`
  padding: 15px 0px;
  ${(props) => (props.idx === 0 ? 'border-top: 1px solid #d7d7d7;' : '')}
  border-bottom: 1px solid #d7d7d7;
`;

const ResultTitleDiv = styled.div`
  margin-bottom: 5px;
`;

const ResultTitle = styled.span`
  color: #222222;
  font-size: 16px;
  font-weight: 500;
`;

const ResultContentPreview = styled.div`
  color: #888888;
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  max-height: 55px;
  white-space: normal;
  overflow: hidden;
`;

const ResultContent = ({ result }) => {
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
          <ResultContainer idx={idx} key={`${generation}_${boostcampId}_${name}`}>
            <ResultTitleDiv>
              <ResultTitle>{`${generation}기 ${boostcampId} ${name}`}</ResultTitle>
            </ResultTitleDiv>
            <div>
              <ResultContentPreview>{content}</ResultContentPreview>
            </div>
          </ResultContainer>
        ))}
    </ContentContainer>
  );
};

export default ResultContent;
