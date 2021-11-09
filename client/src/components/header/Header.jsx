import React from "react";
import styled from 'styled-components';
import Logo from "./header-components/Logo";
import HeaderMenu from "./header-components/HeaderMenu";
import HeaderSearchBar from "./header-components/HeaderSearchBar";

const HeaderBar = styled.div`
  width: 100%;
  min-width: 1920px;
  height: 90px;
  background: #E8A20C;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderBar>
      <HeaderNav>
        <Logo />
        <HeaderMenu />
        <HeaderSearchBar />
      </HeaderNav>
    </HeaderBar>
  )
}

export default Header;