import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import user from '../../../resource/img/user.svg';
import SelectModal from '../../select-modal/SelectModal';
import { SelectTgContext } from '../../../App';

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
  const { isUserInfoOn } = useContext(SelectTgContext);

  return (
    <UserBtn className="TgSelect SelectUserInfo">
      <SelectModal
        className="SelectUserInfo"
        content={['로그인']}
        isSelectOn={isUserInfoOn}
        move={{ top: '55px', left: '0px', translateX: '-70%' }}
      />
      <UserSVG src={user} className="TgSelect SelectUserInfo" />
    </UserBtn>
  );
};

export default HeaderUser;
