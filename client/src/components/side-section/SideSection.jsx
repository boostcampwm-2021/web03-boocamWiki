import React from 'react';
import styled from 'styled-components';
import SectionItem from './side-section-components/SectionItem';
import { FetchingRecent, RecentItem } from './side-section-components/recents/RecentItem';
import { FetchingTopView, TopViewItem } from './side-section-components/top-views/TopViewItem';
import { BREAK_POINT_TABLET } from '../../magic-number';

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
