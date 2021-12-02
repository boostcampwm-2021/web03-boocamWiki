import React from 'react';
import LoginSection from '@components/login-section/LoginSection';
import PageLayout from '@pages/common/PageLayout';

const LoginPage = (): JSX.Element => {
  return (
    <PageLayout>
      <LoginSection />
    </PageLayout>
  );
};

export default LoginPage;
