import React from 'react';
import styled from 'styled-components';
import { IDocument } from '../../../types/api-document';

const Li = styled.li`
  list-style: none;
  height: 35px;
  border-bottom: 2px solid #d7d7d7;
`;

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
        return <Li key={item.id}>{templateFunc(item)}</Li>;
      })}
    </>
  );
}
