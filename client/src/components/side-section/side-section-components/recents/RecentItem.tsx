import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IDocument } from '../../../../types/api-document';
import { Utils } from '../../../../utils';

const Flexed = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-right: 6px;
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
  let hour = arg.getHours().toString();
  hour = `0${hour}`.slice(-2);
  let minute = arg.getMinutes().toString();
  minute = `0${minute}`.slice(-2);
  return `${hour}:${minute}`;
};

export const RecentItem = (arg: IDocument): JSX.Element => {
  const { name, boostcampId, generation, timestamp } = arg;
  return (
    <StyledLink to={`/w/${generation}_${boostcampId}_${name}`}>
      <Flexed>
        <TitleP> {Utils.docTitleGen({ name, boostcampId, generation })}</TitleP>
        <RightP>{getTime(timestamp)}</RightP>
      </Flexed>
    </StyledLink>
  );
};

export const FetchingRecent = async ({ maxLength }: { maxLength: number }): Promise<IDocument[]> => {
  const result = await fetch(`/documents/recents?count=${maxLength}`);
  const list = await result.json();
  return list;
};
