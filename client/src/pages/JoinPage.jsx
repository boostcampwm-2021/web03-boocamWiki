import React from 'react';
import JoinSection from '../components/join-section/JoinSection';
import { useValidate } from '../utils/login';
import PageLayout from './common/PageLayout';

const JoinPage = () => {
  useValidate(false);
  return (
    <PageLayout>
      <JoinSection />
    </PageLayout>
  );
};

export default JoinPage;
