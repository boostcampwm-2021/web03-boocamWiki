import React from 'react';
import styled from 'styled-components';
import worldcupBannerImg from '@resource/img/world-cup.png';
import { BREAK_POINT_TABLET } from '@utils/display-width';
import SectionItem from '@components/side-section/side-section-components/SectionItem';
import { FetchingRecent, RecentItem } from '@components/side-section/side-section-components/recents/RecentItem';
import { FetchingTopView, TopViewItem } from '@components/side-section/side-section-components/top-views/TopViewItem';

const SideSection = () => {
  const worldcupURL = 'https://www.wiziboost.ga/';
  return (
    <SideArea>
      <SectionItem title="최근 변경" onLoadedFetch={FetchingRecent} itemTemplate={RecentItem} />
      <SectionItem title="부캠 조회 순위" onLoadedFetch={FetchingTopView} itemTemplate={TopViewItem} />
      <a href={worldcupURL} target="_blank" rel="noreferrer">
        <WorldcupBanner alt="월드컵 하러가기" src={worldcupBannerImg} />
      </a>
    </SideArea>
  );
};

const SideArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    display: none;
  }
`;

const WorldcupBanner = styled.img`
  width: 290px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;

  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    display: none;
  }
`;

export default SideSection;
