import React from 'react';

const ResultContent = ({ result }) => {
  return (
    <div>
      {result?.map(({ generation, boostcamp_id: boostcampId, name, content }) => (
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
