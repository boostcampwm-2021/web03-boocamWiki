import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import Loading from '../Loading';
import MdParser from '../MdParser';
import { Utils } from '../../utils';
import WikiContentsIndex from '../WikiContentsIndex';
import WikiCard from './wiki-section-components/WikiCard';

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

const Padd = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
`;

const WikiSection = ({ generation, boostcampId, name }) => {
  const [docData, setDocData] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = generation + boostcampId + name;

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/documents/?generation=${generation}&boostcamp_id=${boostcampId}&name=${name}`);
      if (res.status !== 200) {
        history.push('/error');
      }
      const { result } = await res.json();
      setDocData(result[0]);
      setLoading(false);
    };

    getContent();
  }, [id]);

  return (
    <Main>
      <MainHeader title={Utils.docTitleGen({ name, boostcampId, generation }, 0)} />
      {loading && <Loading />}
      {!loading && (
        <>
          <Padd>
            <WikiContentsIndex title="목차" text={docData.content} />
            <WikiCard docData={docData} name={name} />
          </Padd> 

          <MdParser content={docData.content} />
        </>
      )}
    </Main>
  );
};
export default WikiSection;
