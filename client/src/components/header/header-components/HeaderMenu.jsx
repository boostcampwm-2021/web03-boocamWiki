import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import recent from '../../../resource/img/recent.svg';
import rank from '../../../resource/img/rank.svg';
import map from '../../../resource/img/map.svg';

const NavMenu = styled.div`
  position: absolute;
  left: 140px;
  width: 408px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuImg = styled.img`
  width: 36px;
  height: 36px;
`;

const Menu = styled.div`
  width: 125px;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px white;
  }
`;

const aTagStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Noto Sans KR',
  fontWeight: 500,
  fontSize: '24px',
  display: 'flex',
  lineHeight: '35px',
  alignItems: 'center',
};

const HeaderMenu = () => {
  return (
    <NavMenu>
      <Menu>
        <Link to="/makedocs" style={aTagStyle}>
          <MenuImg src={recent} />
          문서작성
        </Link>
      </Menu>
      <Menu>
        <Link to="/" style={aTagStyle}>
          <MenuImg src={rank} />
          각종순위
        </Link>
      </Menu>
      <Menu>
        <Link to="/" style={aTagStyle}>
          <MenuImg src={map} />
          위치정보
        </Link>
      </Menu>
    </NavMenu>
  );
};

export default HeaderMenu;
