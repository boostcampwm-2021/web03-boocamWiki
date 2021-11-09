import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import MainHeader from '../SectionTitle';
import Loading from '../Loading';
import ResultView from './search-section-components/ResultView';

const Main = styled.div`
  width: 1115px;
  min-height: 1200px;
  height: 100%;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 10px;
`;

const SearchSection = () => {
  const [searchResult, setSearchResult] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const { generation, boostcamp_id: boostcampId, name, content } = queryString.parse(search);
  const [searchType, searchValue] = Object.entries({ generation, boostcampId, name, content }).filter(
    ([, value]) => value !== undefined,
  )[0];

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/documents/search?${searchType}=${searchValue}`);
      const { result } = await res.json();
      if (res.status !== 200 && res.msg === 'fail') {
        history.push('/error');
      }
      console.log(result);
      setSearchResult(result);
      setLoading(false);
    };

    getContent();
  }, [search]);

  return (
    <Main>
      <MainHeader title="검색결과" />
      {loading && <Loading />}
      {!loading && <ResultView type={searchType} value={searchValue} result={searchResult} />}
    </Main>
  );
};
export default SearchSection;
