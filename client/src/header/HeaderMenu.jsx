import React from "react";
import styled from "styled-components";
import recent from '../resource/img/recent.svg';
import rank from '../resource/img/rank.svg';
import map from '../resource/img/map.svg';

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
    color: white;
    width: 141px;
    height: 52px;
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 24px;
    &:hover{
        box-shadow: 0px 5px white;
    }
`;

const HeaderMenu = () => {
    const newDocs = () => {
        alert("문서 작성 페이지");
    }

    const rankPage = () => {
        alert("각종 순위 페이지");
    }

    const locationPage = () => {
        alert("위치 정보 페이지");
    }

    return(
        <NavMenu>
            <Menu onClick={newDocs}>
                <MenuImg src={recent} />
                <div>문서 작성</div>
            </Menu>
            <Menu onClick={rankPage}>
                <MenuImg src={rank} />
                각종 순위
            </Menu>
            <Menu onClick={locationPage}>
                <MenuImg src={map} />   
                위치 정보
            </Menu>
        </NavMenu>
    )
}

export default HeaderMenu;