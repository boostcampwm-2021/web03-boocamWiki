import React from "react";
import styled from 'styled-components';
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import HeaderSearchBar from "./HeaderSearchBar";

const HeaderBar = styled.div`
    width: 100%;
    height: 80px;
    background: #E8A20C;
    display: flex;
    justify-content: center;
`;

const HeaderNav = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
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