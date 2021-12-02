import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT_TABLET } from '@utils/display-width';
import SectionItem from '@components/side-section/side-section-components/SectionItem';
import { FetchingRecent, RecentItem } from '@components/side-section/side-section-components/recents/RecentItem';
import { FetchingTopView, TopViewItem } from '@components/side-section/side-section-components/top-views/TopViewItem';

const SideSection = () => {
  return (
    <SideArea>
      <SectionItem title="최근 변경" onLoadedFetch={FetchingRecent} itemTemplate={RecentItem} />
      <SectionItem title="부캠 조회 순위" onLoadedFetch={FetchingTopView} itemTemplate={TopViewItem} />
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

export default SideSection;
