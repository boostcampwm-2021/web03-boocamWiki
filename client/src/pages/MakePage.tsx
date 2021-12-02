import React from 'react';
import PageLayout from '@pages/common/PageLayout';
import MakeSection from '@components/make-section/MakeSection';
import { useValidate } from '@utils/login';

const MakePage = ({ history }: { history: History }): JSX.Element => {
  useValidate(true);
  return (
    <PageLayout>
      <MakeSection history={history} />
    </PageLayout>
  );
};

export default MakePage;
