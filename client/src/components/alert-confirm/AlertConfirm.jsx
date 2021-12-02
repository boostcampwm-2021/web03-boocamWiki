import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import close from '@resource/img/close.svg';
import logo from '@resource/img/logo2.png';
import { font, flexBox } from '@styles/styled-components/mixin';

const AlertConfirm = ({ modalContent, isConfirm = false, setLastCheck }) => {
  const handleYes = (e) => {
    setLastCheck(true);
  };

  return ReactDom.createPortal(
    <>
      <ModalBackground className="close-alert" />
      <Modal>
        <ModalHeader>
          <img src={logo} alt="logo" width="48px" height="24px" />
          <BtnClose src={close} alt="close" className="close-alert" />
        </ModalHeader>
        <ModalBorder />
        <ModalBody>
          {modalContent}
          {isConfirm && <ButtonYes onClick={handleYes}>예</ButtonYes>}
          {isConfirm && <ButtonNo className="close-alert">아니요</ButtonNo>}
        </ModalBody>
      </Modal>
    </>,
    document.getElementById('portal'),
  );
};

const ButtonCommon = styled.button`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  ${font({ color: '#fff', size: '16px', weight: '500' })};
  width: 70px;
  height: 28px;
  border-radius: 5px;
  border: none;
  position: absolute;
  top: 127px;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonYes = styled(ButtonCommon)`
  background-color: #0055fb;
  left: 98px;
`;

const ButtonNo = styled(ButtonCommon)`
  background-color: #f45452;
  right: 98px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 200px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #222222;
  filter: opacity(20%);
`;

const ModalHeader = styled.div`
  ${flexBox({ justifyContent: 'space-between', alignItems: 'center' })};
  padding: 5px;
`;

const BtnClose = styled.img`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const ModalBorder = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d7d7d7;
`;

const ModalBody = styled.div`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })}
  ${font({ color: '#222222', size: '18px', weight: 'normal' })}
  padding: 10px 20px 20px 20px;
  height: 165px;
  position: relative;
`;

export default AlertConfirm;
