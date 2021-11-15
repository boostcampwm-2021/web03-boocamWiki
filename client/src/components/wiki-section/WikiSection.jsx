import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainSection from '../common/MainSection'
import Loading from '../Loading';
import MdParser from '../MdParser';
import { Utils } from '../../utils';
import WikiContentsIndex from '../make-section/make-section-components/WikiContentsIndex';
import WikiCard from './wiki-section-components/WikiCard';


const WikiSection = ({ generation, boostcampId, name, location }) => {
  const [docData, setDocData] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = generation + boostcampId + name;

  // const updateDoc = () => {
  //   history.push(`/updatedocs/${generation}_${boostcampId}_${name}`);
  // }

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
    <MainSection title={Utils.docTitleGen({ name, boostcampId, generation }, 0)}>
      {loading && <Loading />}
      {!loading && (
        <>
          <Padd>
            <WikiContentsIndex title="목차" text={docData.content} />
            <WikiCard docData={docData} name={name} />
          </Padd>
          <Link to={`/updatedocs/${generation}_${boostcampId}_${name}`}>
            <input type='button' value='수정' />
          </Link>
          

          <MdParser content={docData.content} />
        </>
      )}
    </MainSection>
  );
};

const Padd = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
`;

export default WikiSection;
