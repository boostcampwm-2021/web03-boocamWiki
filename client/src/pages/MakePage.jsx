import React from 'react';
import Header from '../components/header/Header';
import MakeSection from '../components/make-section/MakeSection';
import SideSection from '../components/side-section/SideSection';

import style from '../styles/scss/Page.module.scss';

const MakePage = ({ history }) => {
  return (
    <div className={style.PageContainer}>
      <Header />
      <div className={style.SectionWrapper}>
        <MakeSection history={history} />
        <SideSection />
      </div>
    </div>
  );
};
export default MakePage;
