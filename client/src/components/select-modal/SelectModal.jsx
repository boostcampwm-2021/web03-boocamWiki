import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div``;

const ModalWrapper = styled.div`
  width: 165px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(204, 204, 204, 0.25);
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 55px;
  z-index: 2;
`;

const ModalRow = styled.div`
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

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: default;
`;

const SelectModal = ({ content, isModalOn }) => {
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
      {isModalOn && (
        <ModalContainer>
          <ModalBackground />
          <ModalWrapper>
            {content.map((value, idx) => (
              <ModalRow key={value} className="ModalRow" borderRadius={checkFloor(idx)}>
                {value}
              </ModalRow>
            ))}
          </ModalWrapper>
        </ModalContainer>
      )}
    </>
  );
};

export default SelectModal;
