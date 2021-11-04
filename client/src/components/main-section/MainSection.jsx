import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import { md } from './temp';
import Loading from '../Loading';
import MdParser from '../MdParser';

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

const MainSection = () => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContent = async () => {
      let res = await fetch('/documents/:대문');
      res = await res.json();
      setContent(res);
      setLoading(false);
    };

    getContent();
  }, []);

  return (
    <Main>
      <MainHeader title="대문" />
      {loading && <Loading />}
      {!loading && <MdParser content={md} />}
    </Main>
  );
};
export default MainSection;
