import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { SectionListGenerator } from './SectionListGenerator';

const Side = styled.div`
  width: 339px;
  height: 489px;
  background: white;
  margin-bottom: 20px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
`;

const SideTitle = styled.p`
  height: 64px;
  font-size: 28px;
  padding-left: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #d7d7d7;
`;

const recordToItem = (item) => {
  const timetag = 'MAX(created_at)';
  const date = new Date(item[timetag]);
  return {
    name: item.name,
    generation: item.generation,
    boostcampId: item.boostcamp_id,
    timestamp: date,
  };
};

const SectionItem = ({ title, onLoadedFetch, itemTemplate, location }) => {
  const maxLength = 11;
  const [listItem, setListItem] = useState([]);
  useEffect(async () => {
    if (!onLoadedFetch) return;
    const response = await onLoadedFetch({ maxLength });
    const items = response.result.map(recordToItem);
    setListItem(items);
  }, [location.pathname]);

  return (
    <Side>
      <SideTitle>{title}</SideTitle>
      <SectionListGenerator list={listItem} templateFunc={itemTemplate} />
    </Side>
  );
};

export default withRouter(SectionItem);
