import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IDocument } from '../../../../types/api-document';

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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

export const TopViewItem = (arg: IDocument): JSX.Element => {
  const { name, boostcampID, generation } = arg;
  return (
    <StyledLink to={`/w/${generation}_${boostcampID}_${name}`}>
      <Flexed>
        <TitleP>
          {name} ({generation}기 {boostcampID})
        </TitleP>
      </Flexed>
    </StyledLink>
  );
};

export const FetchingTopView = async ({ maxLength }: { maxLength: number }): Promise<IDocument[]> => {
  const result = await fetch(`/documents/ranks?count=${maxLength}`);
  const list = await result.json();
  return list;
};
