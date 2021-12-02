import React, { useEffect, useState } from 'react';
import CategorySection from '@components/category-section/CategorySection';
import PageLayout from '@pages/common/PageLayout';
import { useHistory } from 'react-router';
import Loading from '@src/components/common/Loading';

const getDocumentInfo = (pathname: string): { [key: string]: string } | undefined => {
  const result = pathname.match(/\/c\/(?<category>.+)/);
  return result?.groups;
};

const CategoryPage = ({ location }: { location: Location }): JSX.Element => {
  const history = useHistory();
  const [category, setCategory] = useState<string>();
  useEffect(() => {
    const result = getDocumentInfo(location.pathname);
    if (result) setCategory(result.category);
    else {
      history.push('/error');
    }
  });
  return <PageLayout>{category ? <CategorySection category={category} /> : <Loading />}</PageLayout>;
};
export default CategoryPage;
