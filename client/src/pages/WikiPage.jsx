import React from 'react';
import Header from '../components/header/Header';
import SideSection from '../components/side-section/SideSection';
import WikiSection from '../components/wiki-section/WikiSection';

import style from '../styles/scss/Page.module.scss';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/w\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result.groups;
};

const WikiPage = ({ location }) => {
  const result = getDocumentInfo(location.pathname);
  return (
    <div className={style.PageContainer}>
      <Header />
      <div className={style.SectionWrapper}>
        <WikiSection name={result.name} generation={result.generation} boostcampId={result.boostcampId} />
        <SideSection />
      </div>
    </div>
  );
};
export default WikiPage;
