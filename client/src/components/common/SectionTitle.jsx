import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import editIcon from '../../resource/img/edit.png';
import { flexBox } from '../../styles/styled-components/mixin';

const MainHeader = ({ title, documentMode }) => {
  return (
    <HeaderBox>
      <HeaderTitle>{title}</HeaderTitle>
      {documentMode && (
        <Link to={`/updatedocs/${documentMode.generation}_${documentMode.boostcampId}_${documentMode.name}`}>
          <EditButton>
            <EditIcon alt="edit-icon" src={editIcon} />
          </EditButton>
        </Link>
      )}
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background: #e5e5e5;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 60px;
  position: relative;
  outline: 1px solid #d7d7d7;
  ${flexBox({ alignItems: 'center', justifyContent: 'space-between' })}
`;

const HeaderTitle = styled.div`
  margin-left: 20px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 76px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const EditIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const EditButton = styled.button`
  width: 36px;
  height: 36px;
  margin-right: 20px;
  margin-top: 5px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  &: active {
    transform: scale(0.95);
  }
`;

export default MainHeader;
