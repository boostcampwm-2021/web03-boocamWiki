import React from 'react';
import Header from '@components/header/Header';
import SideSection from '@components/side-section/SideSection';

import style from '@styles/scss/Page.module.scss';

const PageLayout = ({ children }) => {
  return (
    <div className={style.PageContainer}>
      <Header />
      <div className={style.SectionWrapper}>
        {children}
        <SideSection />
      </div>
    </div>
  );
};
export default PageLayout;
