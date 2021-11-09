import React from 'react';
import styled from 'styled-components';
import Logo from './header-components/Logo';
import HeaderMenu from './header-components/HeaderMenu';
import HeaderSearchBar from './header-components/HeaderSearchBar';
import HeaderUser from './header-components/HeaderUser';

const HeaderBar = styled.div`
  position: relative;
  width: 100%;
  min-width: 1190px;
  height: 70px;
  background: #e8a20c;
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const Header = () => {
  return (
    <HeaderBar>
      <Logo />
      <HeaderMenu />
      <HeaderSearchBar />
      <HeaderUser />
    </HeaderBar>
  );
};

export default Header;
