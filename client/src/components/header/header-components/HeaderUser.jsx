import React from 'react';
import styled from 'styled-components';
import user from '../../../resource/img/user.svg';

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
  return (
    <UserBtn>
      <UserSVG src={user} />
    </UserBtn>
  );
};

export default HeaderUser;
