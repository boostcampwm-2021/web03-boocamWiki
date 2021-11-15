import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div``;

const SelectWrapper = styled.div`
  width: 165px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(204, 204, 204, 0.25);
  border-radius: 10px;
  position: absolute;
  top: ${(props) => props.move.top || '0px'};
  left: ${(props) => props.move.left || '0px'};
  transform: translateX(${(props) => props.move.translateX || '0'});
  z-index: 2;
`;

const SelectRow = styled.div`
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 16px;
  width: 165px;
  height: 48px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  border: 1px solid #d7d7d7;
  border-radius: ${(props) => props.borderRadius || '0px'};

  &:hover {
    cursor: pointer;
    background: #e5e5e5;
  }
`;

const SelectBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: default;
`;

const SelectModal = ({ className, content, isSelectOn, move }) => {
  const [first, last] = [0, content.length - 1];
  const [target, setTarget] = useState();

  const checkFloor = (idx) => {
    if (idx === first && idx === last) {
      return '10px';
    }
    if (idx === first) {
      return '10px 10px 0 0';
    }
    if (idx === last) {
      return `0 0 10px 10px`;
    }
    return '0';
  };

  return (
    <>
      {isSelectOn && (
        <SelectContainer>
          <SelectWrapper move={move}>
            {content.map((value, idx) => (
              <SelectRow key={value} className={'SelectRow'.concat(' ', className)} borderRadius={checkFloor(idx)}>
                {value}
              </SelectRow>
            ))}
          </SelectWrapper>
        </SelectContainer>
      )}
    </>
  );
};

export default SelectModal;
