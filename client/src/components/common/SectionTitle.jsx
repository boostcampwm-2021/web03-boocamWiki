import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexBox } from '../../styles/styled-components/mixin';

const MainHeader = ({ title, documentMode }) => {
  return (
    <HeaderBox>
      <HeaderTitle>{title}</HeaderTitle>
      {documentMode && (
        <Link to={`/updatedocs/${documentMode.generation}_${documentMode.boostcampId}_${documentMode.name}`}>
          <EditButton>편집</EditButton>
        </Link>
      )}
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background: #e5e5e5;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 76px;
  position: relative;
  outline: 1px solid #d7d7d7;
  ${flexBox({ alignItems: 'center', justifyContent: 'space-between' })}
`;

const HeaderTitle = styled.div`
  margin-left: 10px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 76px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const EditButton = styled.button`
  min-width: 78px;
  padding: 10px 20px;
  font-size: 20px;
  margin-right: 10px;
  background: #bbb;
  border-radius: 11px;
  border: 0px;
  cursor: pointer;
`;

export default MainHeader;
