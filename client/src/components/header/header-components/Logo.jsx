import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@resource/img/logo2.png';

const Logo = () => {
  return (
    <Link to="/">
      <LogoBtn src={logo} alt="main-logo" />
    </Link>
  );
};

const LogoBtn = styled.img`
  width: 115px;
  height: 60px;
  position: absolute;
  left: 10px;
  top: -2px;
  &:hover {
    cursor: pointer;
  }
`;

export default Logo;
