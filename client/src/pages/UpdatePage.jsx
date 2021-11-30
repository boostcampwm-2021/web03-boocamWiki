import React from 'react';
import PageLayout from '@pages/common/PageLayout';
import UpdateSection from '@components/make-section/UpdateSection';
import { useValidate } from '@utils/login';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/updatedocs\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result.groups;
};

const UpdatePage = ({ history, location }) => {
  useValidate(true);
  const result = getDocumentInfo(location.pathname);
  return (
    <PageLayout>
      <UpdateSection
        history={history}
        name={result.name}
        generation={result.generation}
        boostcampId={result.boostcampId}
      />
    </PageLayout>
  );
};

export default UpdatePage;
