import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import MainHeader from '../SectionTitle';
import Loading from '../Loading';
import ResultView from './search-section-components/ResultView';

const Main = styled.div`
  width: 890px;
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
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const { generation, boostcamp_id: boostcampId, name, content, offset = 1 } = queryString.parse(search);
  const [searchType, searchValue] = Object.entries({ generation, boostcampId, name, content }).filter(
    ([, value]) => value !== undefined,
  )[0];
  const snakeSearchType = searchType === 'boostcampId' ? 'boostcamp_id' : searchType;

  useEffect(() => {
    const getContent = async () => {
      let res = await fetch(`/documents/search?${snakeSearchType}=${searchValue}&offset=${offset - 1}`);
      let { result } = await res.json();
      if (res.status !== 200 && res.msg === 'fail') {
        history.push('/error');
      }
      setSearchResult(result);
      res = await fetch(`/documents/count?${snakeSearchType}=${searchValue}`);
      result = (await res.json()).result;
      if (res.status !== 200) {
        history.push('/error');
      }
      setSearchResultCount(result);
      setLoading(false);
    };

    getContent();
  }, [search]);

  return (
    <Main>
      <MainHeader title="검색결과" />
      {loading && <Loading />}
      {!loading && (
        <ResultView type={snakeSearchType} value={searchValue} result={searchResult} resultCount={searchResultCount} />
      )}
    </Main>
  );
};
export default SearchSection;
