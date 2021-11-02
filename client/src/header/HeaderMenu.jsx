import React from "react";
import styled from "styled-components";
import recent from '../resource/img/recent.svg';
import rank from '../resource/img/rank.svg';
import map from '../resource/img/map.svg';

const NavMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MenuImg = styled.img`
    width: 20px;
    height: 20px;
    padding-right: 5px;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 120px;
    height: 40px;
    margin-right: 15px;
    &:hover{
        cursor: pointer;
        border-bottom: 5px solid white;
    }
`;

const HeaderMenu = () => {
    const clickHandler = (e) => {
        console.log(e.target)
        alert(e.target.innerText)
    }

    return(
        <NavMenu onClick={clickHandler}>
            <Menu>
                <MenuImg src={recent} />
                문서 작성
            </Menu>
            <Menu>
                <MenuImg src={rank} />
                각종 순위
            </Menu>
            <Menu>
                <MenuImg src={map} />   
                위치 정보
            </Menu>
        </NavMenu>
    )
}

export default HeaderMenu;