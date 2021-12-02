import React from 'react';
import TotalDocumentsSection from '@components/total-documents-section/TotalDocumentsSection';
import PageLayout from '@pages/common/PageLayout';

const TotalDocumentsPage = (): JSX.Element => {
  return (
    <PageLayout>
      <TotalDocumentsSection />
    </PageLayout>
  );
};

export default TotalDocumentsPage;
