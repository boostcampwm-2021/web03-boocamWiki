import React from 'react';
import Header from '../components/header/Header';
import MakePageSection from '../components/make-section/MakeSection';
import SideSection from '../components/side-section/SideSection';

import style from '../styles/makePage.module.scss';

const MakePage = ({ history }) => {
  return (
    <div className={style.makePageContainer}>
      <Header />
      <div className={style.sectionWrapper}>
        <MakePageSection history={history} />
        <SideSection />
      </div>
    </div>
  );
};
export default MakePage;
