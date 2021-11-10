import React from 'react';
import styled from 'styled-components';
import Logo from './header-components/Logo';
import HeaderMenu from './header-components/HeaderMenu';
import HeaderSearchBar from './header-components/HeaderSearchBar';
import HeaderUser from './header-components/HeaderUser';

const HeaderBar = styled.div`
  width: 100%;
  height: 70px;
  background: #e8a20c;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderContainer = styled.div`
  padding: 10px;
  position: relative;
  max-width: 1200px;
  width: 100%;
`;

const Header = () => {
  return (
    <HeaderBar>
      <HeaderContainer>
        <Logo />
        <HeaderMenu />
        <HeaderSearchBar />
        <HeaderUser />
      </HeaderContainer>
    </HeaderBar>
  );
};

export default Header;
