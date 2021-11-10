import React from 'react';
import Header from '../components/header/Header';
import SearchSection from '../components/search-section/SearchSection';
import SideSection from '../components/side-section/SideSection';

import style from '../styles/scss/Page.module.scss';

const SearchPage = () => {
  return (
    <div className={style.PageContainer}>
      <Header />
      <div className={style.SectionWrapper}>
        <SearchSection />
        <SideSection />
      </div>
    </div>
  );
};
export default SearchPage;
