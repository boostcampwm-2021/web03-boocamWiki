import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../resource/img/logo.png';

const LogoBtn = styled.button`
  border: none;
  background: #e8a20c;
  width: 139px;
  height: 83px;
  &:hover {
    cursor: pointer;
  }
  margin-right: 96px;
`;

const LogoTag = styled.img`
  width: 139px;
  height: 70px;
`;

const Logo = () => {
  return (
    <Link to="/">
      <LogoBtn>
        <LogoTag src={logo} />
      </LogoBtn>
    </Link>
  );
};

export default Logo;
