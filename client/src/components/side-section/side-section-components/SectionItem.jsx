import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  left: 4.13%;
  right: 0.29%;
  top: 0%;
  bottom: 86.91%;
  font-size: 20px;
  padding-left: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 28px;
  display: flex;
  align-items: center;
`;

const ListItem = styled.li`
  list-style: none;
  padding-left: 10px;
`;

const SectionItem = ({ title, OnLoaded }) => {
  const [listItem, setListItem] = useState([]);
  useEffect(async () => {
    if (OnLoaded) {
      const response = await OnLoaded();
      const items = response.result.map((item) => item);
      setListItem(items);
    }
  }, []);
  return (
    <Side>
      <SideTitle>{title}</SideTitle>
      <ul>
        {listItem.map((item) => (
          <ListItem key={`${item.generation}${item.boostcamp_id}${item.name}`}>
            {item.name}({item.generation},{item.boostcamp_id})
          </ListItem>
        ))}
      </ul>
    </Side>
  );
};

export default SectionItem;
