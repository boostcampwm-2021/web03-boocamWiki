import React from 'react';
import SearchSection from '@components/search-section/SearchSection';
import PageLayout from '@pages/common/PageLayout';

const SearchPage = (): JSX.Element => {
  return (
    <PageLayout>
      <SearchSection />
    </PageLayout>
  );
};

export default SearchPage;
