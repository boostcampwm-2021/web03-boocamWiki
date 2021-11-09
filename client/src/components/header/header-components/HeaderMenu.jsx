import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import recent from '../../../resource/img/recent.svg';
import rank from '../../../resource/img/rank.svg';
import map from '../../../resource/img/map.svg';

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 120px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 141px;
  height: 36px;
  margin-right: 30px;
  position: relative;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 5px white;
  }
`;

const MenuImg = styled.img`
  width: 36px;
  height: 36px;
  padding-right: 5px;
`;

const MunuText = styled.div`
  
`;

const aTagStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Noto Sans KR',
  fontWeight: 500,
  fontSize: '24px',
  display: 'flex',
  alignItems: 'center',
}

const HeaderMenu = () => {
  return(
    <NavMenu>
      <Menu>
        <Link to='/makedocs' style={aTagStyle}>
          <MenuImg src={recent} />
          <MunuText>문서 작성</MunuText>
        </Link>
      </Menu>
      <Menu>
        <Link to='/' style={aTagStyle}>
          <MenuImg src={rank} />
          <MunuText>각종 순위</MunuText>
        </Link>
      </Menu>
      <Menu>
        <Link to='/' style={aTagStyle}>
          <MenuImg src={map} />
          <MunuText>위치 정보</MunuText>
        </Link>
      </Menu>
    </NavMenu>
  )
}

export default HeaderMenu;