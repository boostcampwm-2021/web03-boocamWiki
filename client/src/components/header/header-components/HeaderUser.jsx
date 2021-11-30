import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import user from '@resource/img/user.svg';
import SelectModal from '@select-modal/SelectModal';
import { SelectTgContext } from '@src/App';
import { getAccessTokenPayload, isValidated } from '@utils/login';

const HeaderUser = () => {
  const { isUserInfoOn } = useContext(SelectTgContext);
  const accessTokenPayload = getAccessTokenPayload();
  return (
    <UserBtn className="TgSelect SelectUserInfo">
      {!isValidated() && (
        <>
          <SelectModal
            className="SelectUserInfo"
            content={['로그인']}
            isSelectOn={isUserInfoOn}
            move={{ top: '55px', left: '0px', translateX: '-70%' }}
          />
          <UserSVG src={user} className="TgSelect SelectUserInfo" />
        </>
      )}
      {isValidated() && (
        <>
          <SelectModal
            className="SelectUserInfo"
            content={['로그아웃']}
            isSelectOn={isUserInfoOn}
            move={{ top: '55px', left: '0px', translateX: '-70%' }}
          />
          <CircleUserSVG src={accessTokenPayload.avatar_url} className="TgSelect SelectUserInfo" />
        </>
      )}
    </UserBtn>
  );
};

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

const CircleUserSVG = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 999px;
`;

export default HeaderUser;
