import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../components/common/Loading';
import WikiSection from '../components/wiki-section/WikiSection';
import PageLayout from './common/PageLayout';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/w\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result;
};

const WikiPage = ({ location }) => {
  const [result, setResult] = useState();
  const history = useHistory();
  useEffect(() => {
    const reg = getDocumentInfo(location.pathname);
    if (!reg) {
      history.push('/search?name=');
    } else setResult(reg.groups);
  }, [location.pathname]);

  return (
    <PageLayout>
      {result ? (
        <WikiSection name={result.name} generation={result.generation} boostcampId={result.boostcampId} />
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
};
export default WikiPage;
