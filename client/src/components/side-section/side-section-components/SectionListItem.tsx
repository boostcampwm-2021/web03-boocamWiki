import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IDocument } from '../../../types/api-document';

const Flexed = styled.div`
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

const TitleP = styled.p`
  color: #0055fb;
`;

const RightP = styled.p`
  color: #000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const getTime = (arg: Date): string => {
  return `${arg.getHours()}:${arg.getMinutes()}`;
};

export const SectionListItem = (arg: IDocument): JSX.Element => {
  const { name, boostcampID, generation, timestamp } = arg;
  return (
    <StyledLink to={`/w/${generation}_${boostcampID}_${name}`}>
      <Flexed>
        <TitleP>
          {name} ({generation}기 {boostcampID})
        </TitleP>
        <RightP>{getTime(timestamp)}</RightP>
      </Flexed>
    </StyledLink>
  );
};
