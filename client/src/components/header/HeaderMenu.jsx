import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import recent from '../../resource/img/recent.svg';
import rank from '../../resource/img/rank.svg';
import map from '../../resource/img/map.svg';

const NavMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 120px;
`;

const MenuImg = styled.img`
    width: 36px;
    height: 36px;
    padding-right: 5px;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 141px;
    height: 52px;
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    &:hover{
        box-shadow: 0px 5px white;
    }
`;

const aTagStyle = {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Noto Sans KR',
    fontWeight: 500,
    fontSize: '24px',
}

const HeaderMenu = () => {
    return(
        <NavMenu>
            <Menu>
                <MenuImg src={recent} />
                <Link to='/makedocs' style={aTagStyle}>문서 작성</Link>
            </Menu>
            <Menu>
                <MenuImg src={rank} />
                <Link to='/tmp' style={aTagStyle}>각종 순위</Link>
            </Menu>
            <Menu>
                <MenuImg src={map} />   
                <Link to='/tmp' style={aTagStyle}>위치 정보</Link>
            </Menu>
        </NavMenu>
    )
}

export default HeaderMenu;