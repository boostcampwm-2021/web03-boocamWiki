import React from 'react';
import CategorySection from '@components/category-section/CategorySection';
import PageLayout from '@pages/common/PageLayout';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/c\/(?<category>.+)/);
  return result.groups;
};

const CategoryPage = ({ location }) => {
  const result = getDocumentInfo(location.pathname);
  return (
    <PageLayout>
      <CategorySection category={result.category} />
    </PageLayout>
  );
};
export default CategoryPage;
