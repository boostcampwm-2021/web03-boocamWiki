import React from 'react';
import MainSection from '@components/main-door/MainDoor';
import PageLayout from '@pages/common/PageLayout';

const MainPage = (): JSX.Element => {
  return (
    <PageLayout>
      <MainSection />
    </PageLayout>
  );
};

export default MainPage;
