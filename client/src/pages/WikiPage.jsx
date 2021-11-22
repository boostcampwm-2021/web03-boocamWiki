import React from 'react';
import WikiSection from '../components/wiki-section/WikiSection';
import PageLayout from './common/PageLayout';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/w\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result.groups;
};

const WikiPage = ({ location }) => {
  const result = getDocumentInfo(location.pathname);
  return (
    <PageLayout>
      <WikiSection name={result.name} generation={result.generation} boostcampId={result.boostcampId} />
    </PageLayout>
  );
};
export default WikiPage;
