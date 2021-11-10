import React, { useState, useEffect } from 'react';
import { remark } from 'remark';
import strip from 'strip-markdown';

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
    <div>
      {renderResult &&
        renderResult.map(({ generation, boostcamp_id: boostcampId, name, content }) => (
          <div>
            <div>
              <span>{generation}</span>
              <span> </span>
              <span>{boostcampId}</span>
              <span> </span>
              <span>{name}</span>
            </div>
            <div>{content}</div>
          </div>
        ))}
    </div>
  );
};

export default ResultContent;
