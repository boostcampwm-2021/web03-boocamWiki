import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import MainSection from '../common/MainSection';
import Loading from '../common/Loading';
import ResultView from './search-section-components/ResultView';

const SearchSection = () => {
  const [searchResult, setSearchResult] = useState({});
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const { generation, boostcamp_id, name, content, offset = 1 } = queryString.parse(search);
  const [searchType, searchValue] = Object.entries({ generation, boostcamp_id, name, content }).filter(
    ([, value]) => value !== undefined,
  )[0] ?? ['', ''];
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getResultList = async () => {
      const res = await fetch(`/api/documents/search?${searchType}=${searchValue}&offset=${offset - 1}`);
      if (res.status !== 200 && res.msg === 'fail') {
        history.push('/error');
      }
      const rjson = await res.json();
      return { result: rjson.result, offset: rjson.offset };
    };

    const getResultCount = async () => {
      const res = await fetch(`/api/documents/count?${searchType}=${searchValue}`);
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      return result;
    };

    const getContent = async () => {
      setLoading(true);
      const resultList = await getResultList();
      setSearchResult(resultList.result);
      const off = parseInt(resultList.offset, 10);
      setCurrentPage(off + 1);
      const resultCount = await getResultCount();
      setSearchResultCount(resultCount);

      if (searchType !== 'content' && resultList.result.length === 1 && resultCount === 1) {
        const [{ generation, boostcamp_id: boostcampId, name }] = resultList.result;
        history.push(`/w/${generation}_${boostcampId}_${name}`);
      }

      setLoading(false);
    };
    getContent();
  }, [search]);

  return (
    <MainSection title="검색결과">
      {loading && <Loading />}
      {!loading && (
        <ResultView
          type={searchType}
          value={searchValue}
          result={searchResult}
          resultCount={searchResultCount}
          currentPage={currentPage}
        />
      )}
    </MainSection>
  );
};
export default SearchSection;
