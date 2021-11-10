import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../resource/img/logo2.png';

const LogoBtn = styled.img`
  width: 115px;
  height: 60px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    cursor: pointer;
  }
`;

const Logo = () => {
  return (
    <Link to="/">
      <LogoBtn src={logo} />
    </Link>
  );
};

export default Logo;
