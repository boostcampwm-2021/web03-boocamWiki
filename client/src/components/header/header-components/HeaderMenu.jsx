import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import recent from '../../../resource/img/recent.svg';
import rank from '../../../resource/img/rank.svg';
import map from '../../../resource/img/map.svg';
import { BREAK_POINT_MOBILE } from '../../../magic-number';

const NavMenu = styled.div`
  position: absolute;
  left: 150px;
  width: 383px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 129px;
    left: 145px;
  }
`;

const MenuText = styled.p`
  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    display: none;
  }
`;

const MenuImg = styled.img`
  width: 28px;
  height: 28px;
`;

const Menu = styled.div`
  width: 113px;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px white;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const aTagStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Noto Sans KR',
  fontWeight: 500,
  fontSize: '22px',
  display: 'flex',
  lineHeight: '35px',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const HeaderMenu = () => {
  return (
    <NavMenu>
      <Menu>
        <Link to="/makedocs" style={aTagStyle}>
          <MenuImg src={recent} />
          <MenuText>문서작성</MenuText>
        </Link>
      </Menu>
      <Menu style={{ transform: 'translateX(-2%)' }}>
        <Link to="/" style={aTagStyle}>
          <MenuImg src={rank} />
          <MenuText>각종순위</MenuText>
        </Link>
      </Menu>
      <Menu>
        <Link to="/" style={aTagStyle}>
          <MenuImg src={map} />
          <MenuText>위치정보</MenuText>
        </Link>
      </Menu>
    </NavMenu>
  );
};

export default HeaderMenu;
