import React from 'react';
import styled from 'styled-components';
import user from '../../../resource/img/user.svg';

const UserBtn = styled.button`
  background: #e8a20c;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const UserSVG = styled.img`
  width: 55px;
  height: 55px;
`;

const HeaderUser = () => {
  return (
    <UserBtn>
      <UserSVG src={user} />
    </UserBtn>
  );
};

export default HeaderUser;
