import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import MainHeader from '../SectionTitle';
import Loading from '../Loading';

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

  useEffect(() => {
    const getContent = async () => {
      const queryString = Object.entries({ generation, boostcampId, name, content })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      const res = await fetch(`/documents/search?${queryString}`);
      const { result } = await res.json();
      if (res.status !== 200 && res.msg === 'fail') {
        history.push('/error');
      }
      console.log(result);
      setSearchResult(result);
      setLoading(false);
    };

    getContent();
  }, []);

  return (
    <Main>
      <MainHeader title="검색결과" />
      {loading && <Loading />}
      {!loading && (
        <ul>
          {searchResult.map((data) => (
            <li>{JSON.stringify(data)}</li>
          ))}
        </ul>
      )}
    </Main>
  );
};
export default SearchSection;
