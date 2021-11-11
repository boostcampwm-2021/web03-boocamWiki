import React from 'react';
import Header from '../components/header/Header';
import MainSection from '../components/main-section/MainSection';
import SideSection from '../components/side-section/SideSection';
import SelectModal from '../components/select-modal/SelectModal';

import style from '../styles/scss/Page.module.scss';

const MakePage = () => {
  return (
    <div className={style.PageContainer}>
      <Header />
      <div className={style.SectionWrapper}>
        <MainSection />
        <SideSection />
      </div>
    </div>
  );
};
export default MakePage;
