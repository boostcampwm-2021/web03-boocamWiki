import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SectionListGenerator } from './SectionListGenerator';
import { SectionListItem } from './SectionListItem';

const Side = styled.div`
  width: 339px;
  height: 489px;
  background: white;
  margin-top: 10px;
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
    id: item.name,
    name: item.name,
    generation: item.generation,
    boostcampID: item.boostcamp_id,
    timestamp: date,
  };
};

const SectionItem = ({ title, OnLoaded }) => {
  const [listItem, setListItem] = useState([]);
  useEffect(async () => {
    if (!OnLoaded) return;
    const response = await OnLoaded();
    const items = response.result.map(recordToItem);
    setListItem(items);
  }, []);

  return (
    <Side>
      <SideTitle>{title}</SideTitle>
      <SectionListGenerator list={listItem} templateFunc={SectionListItem} />
    </Side>
  );
};

export default SectionItem;
