import React, { useState } from 'react';
import styled from 'styled-components';
import user from '../../../resource/img/user.svg';
import SelectModal from '../../select-modal/SelectModal';

const UserBtn = styled.button`
  position: absolute;
  right: 10px;
  background: #e8a20c;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const UserSVG = styled.img`
  width: 50px;
  height: 50px;
`;

const HeaderUser = () => {
  const [isUserModalOn, setIsUserModalOn] = useState(false);

  const clickHandler = ({ target }) => {
    setIsUserModalOn(!isUserModalOn);
    const classList = target.className.split(' ');
    if (classList.includes('ModalRow')) {
      console.log(target.innerHTML);
    }
  };

  return (
    <UserBtn onClick={clickHandler}>
      <SelectModal content={['로그인']} isModalOn={isUserModalOn} translateX="70" />
      <UserSVG src={user} />
    </UserBtn>
  );
};

export default HeaderUser;
