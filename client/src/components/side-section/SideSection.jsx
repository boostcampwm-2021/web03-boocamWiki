import React from 'react';
import styled from 'styled-components';
import SectionItem from './side-section-components/SectionItem';

const SideArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const maxLength = 11;

const SideSection = () => {
  const FetchingRecent = async () => {
    const result = await fetch(`/documents/recents?count=${maxLength}`);
    const list = await result.json();
    return list;
  };

  const FetchingTopView = async () => {
    const result = await fetch(`/documents/ranks?count=${maxLength}`);
    const list = await result.json();
    return list;
  };

  return (
    <SideArea>
      <SectionItem title="최근 변경" OnLoaded={FetchingRecent} />
      <SectionItem title="부캠 조회 순위" OnLoaded={FetchingTopView} />
    </SideArea>
  );
};

export default SideSection;
