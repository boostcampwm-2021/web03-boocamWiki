import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
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

const WikiSection = ({ generation, boostcampID, name }) => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = generation + boostcampID + name;

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/documents/?generation=${generation}&boostcamp_id=${boostcampID}&name=${name}`);
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      setContent(result[0].content);
      setLoading(false);
    };

    getContent();
  }, [id]);

  return (
    <Main>
      <MainHeader title={`${name} (${generation}기 ${boostcampID})`} />
      {loading && <Loading />}
      {!loading && <MdParser content={content} />}
    </Main>
  );
};
export default WikiSection;
