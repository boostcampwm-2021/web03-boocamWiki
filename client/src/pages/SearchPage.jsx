import React from 'react';
import Header from '../components/header/Header';
import SearchSection from '../components/search-section/SearchSection';
import SideSection from '../components/side-section/SideSection';

import style from '../styles/makePage.module.scss';

const SearchPage = () => {
  return (
    <div className={style.makePageContainer}>
      <Header />
      <div className={style.sectionWrapper}>
        <SearchSection />
        <SideSection />
      </div>
    </div>
  );
};
export default SearchPage;
