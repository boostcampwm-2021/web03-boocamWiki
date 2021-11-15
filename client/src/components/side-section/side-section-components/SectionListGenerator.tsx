import React from 'react';
import styled from 'styled-components';
import { IDocument } from '../../../types/api-document';

export function SectionListGenerator<T extends IDocument>({
  list,
  templateFunc,
}: {
  list: T[];
  templateFunc: (arg: T) => JSX.Element;
}): JSX.Element {
  return (
    <>
      {list.map((item) => {
        const id = item.name + item.boostcampId + item.generation;
        if (!templateFunc) return <></>;
        return <Li key={id}>{templateFunc(item)}</Li>;
      })}
    </>
  );
}

const Li = styled.li`
  list-style: none;
  height: 35px;
  border-bottom: 2px solid #d7d7d7;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // width: 280px;
`;
