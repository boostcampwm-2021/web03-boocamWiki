import React from 'react';
import styled from 'styled-components';
import SectionItem from './side-section-components/SectionItem';
import { FetchingRecent, RecentItem } from './side-section-components/recents/RecentItem';
import { FetchingTopView, TopViewItem } from './side-section-components/top-views/TopViewItem';

const SideArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideSection = () => {
  return (
    <SideArea>
      <SectionItem title="최근 변경" onLoadedFetch={FetchingRecent} itemTemplate={RecentItem} />
      <SectionItem title="부캠 조회 순위" onLoadedFetch={FetchingTopView} itemTemplate={TopViewItem} />
    </SideArea>
  );
};

export default SideSection;
