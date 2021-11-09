import React from 'react';
import styled from 'styled-components';
import { IDocument } from '../../../types/api-document';

export const Flexed = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0px 8px;
  cursor: pointer;
  height: 100%;
  &:hover {
    background: #f7f7f7;
  }
`;

export const TitleP = styled.p`
  color: #0055fb;
`;

export const RightP = styled.p`
  color: inherit;
`;

const getTime = (arg: Date): string => {
  return `${arg.getHours()}:${arg.getMinutes()}`;
};

export const SectionListItem = (arg: IDocument): JSX.Element => {
  const { name, boostcampID, generation, timestamp } = arg;
  return (
    <Flexed>
      <TitleP>
        {name} ({generation}기 {boostcampID})
      </TitleP>
      <RightP>{getTime(timestamp)}</RightP>
    </Flexed>
  );
};
