import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT_TABLET } from '@utils/display-width';
import worldcupBannerImg from '@resource/img/world-cup-banner.png';
import ssulBannerGif from '@resource/img/ssul-banner.gif';

export const Banners = (): JSX.Element => {
  const wiziWorldCupBannerLink = 'https://www.wiziboost.ga/';
  const ssulBannerLink = 'http://www.gaeinsa.kro.kr/';
  const title = '제휴 서비스';
  return (
    <Side>
      <SideTitle>{title}</SideTitle>
      <Anchor href={wiziWorldCupBannerLink} target="_blank" rel="noreferrer">
        <BannerItem alt="이상형 월드컵 하러가기" src={worldcupBannerImg} width="290" height="89" />
      </Anchor>
      <Anchor href={ssulBannerLink} target="_blank" rel="noreferrer">
        <BannerItem alt="개발자간 스터디 그룹 매칭" src={ssulBannerGif} width="290" height="89" />
      </Anchor>
    </Side>
  );
};

const BannerItem = styled.img`
  width: 288px;
  display: block;
  position: relative;
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    display: none;
  }
`;

const Anchor = styled.a`
  display: inline-block;
  border-bottom: 2px solid #d7d7d7;
  box-sizing: border-box;
`;

const Side = styled.div`
  width: 290px;
  background: white;
  margin-bottom: 20px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
  padding-bottom: 35px;
`;

const SideTitle = styled.p`
  height: 64px;
  font-size: 28px;
  padding-left: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #d7d7d7;
`;
