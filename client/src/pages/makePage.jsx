import React from 'react';
import Header from '../components/header/Header';
import MakePageSection from '../components/make-section/MakeSection';
import SideSection from '../components/side-section/SideSection';

import style from '../styles/makePage.module.scss';


const MakePage = () => {
    return (
        <div className={style.makePageContainer}>
          <Header />
          <div className={style.sectionWrapper}>
            <MakePageSection />
            <SideSection />
          </div>
        </div>
    );
}
export default MakePage;