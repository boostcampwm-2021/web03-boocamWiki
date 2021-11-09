import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import Loading from '../Loading';
import MdParser from '../MdParser';

const Main = styled.div`
  width: 1115px;
  min-height: 1000px;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
`;

const MainSection = () => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch('/documents/?generation=0&boostcamp_id=J000&name=대문');
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      console.log(result);
      setContent(result[0].content);
      setLoading(false);
    };

    // getContent();
  }, []);

  return (
    <Main>
      <MainHeader title="대문" />
      {loading && <Loading />}
      {!loading && <MdParser content={content} />}
    </Main>
  );
};

export default MainSection;
