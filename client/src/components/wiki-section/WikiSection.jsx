import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainSection from '../common/MainSection';
import Loading from '../common/Loading';
import MdParser from '../common/MdParser';
import { Utils } from '../../utils';
import WikiContentsIndex from '../make-section/make-section-components/WikiContentsIndex';
import WikiCard from './wiki-section-components/WikiCard';
import { WikiCategory } from './wiki-section-components/WikiCategory';

const WikiSection = ({ generation, boostcampId, name }) => {
  const [docData, setDocData] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = generation + boostcampId + name;

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/api/documents/?generation=${generation}&boostcamp_id=${boostcampId}&name=${name}`);
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
    <MainSection
      title={Utils.docTitleGen({ name, boostcampId, generation }, 0)}
      documentMode={{ generation, boostcampId, name }}
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <WikiCategory categories={[docData.classification]} />
          <Padd>
            <WikiContentsIndex title="목차" text={docData.content} />
            <WikiCard docData={docData} name={name} />
          </Padd>

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
