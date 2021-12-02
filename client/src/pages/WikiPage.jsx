import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '@components/common/Loading';
import WikiSection from '@components/wiki-section/WikiSection';
import PageLayout from '@pages/common/PageLayout';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/w\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result;
};

const pathnameNorm = (pathname) => {
  if (!pathname) return '';
  return pathname.startsWith('/w/') ? pathname.substr(3) : pathname;
};

const WikiPage = ({ location }) => {
  const [result, setResult] = useState();
  const history = useHistory();
  useEffect(() => {
    const reg = getDocumentInfo(location.pathname);
    if (!reg) {
      // 파싱 자체가 안된다면
      const pathname = pathnameNorm(location.pathname);
      history.push(`/search?name=${pathname}`);
    }
    // 파싱이라도 된다면
    else setResult(reg.groups);
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
