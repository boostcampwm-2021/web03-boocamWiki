import React from 'react';
import PageLayout from './common/PageLayout';
import MakeSection from '../components/make-section/MakeSection';

const MakePage = ({ history }) => {
  return (
    <PageLayout>
      <MakeSection history={history} />
    </PageLayout>
  );
};

export default MakePage;
