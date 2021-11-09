import React from 'react';
import Header from '../components/header/Header';
import SideSection from '../components/side-section/SideSection';
import WikiSection from '../components/wiki-section/WikiSection';

import style from '../styles/makePage.module.scss';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/w\/(?<generation>\d+)_(?<boostcampID>.+)_(?<name>.+)/);
  return result.groups;
};

const WikiPage = ({ location }) => {
  const result = getDocumentInfo(location.pathname);
  return (
    <div className={style.makePageContainer}>
      <Header />
      <div className={style.sectionWrapper}>
        <WikiSection name={result.name} generation={result.generation} boostcampID={result.boostcampID} />
        <SideSection />
      </div>
    </div>
  );
};
export default WikiPage;
