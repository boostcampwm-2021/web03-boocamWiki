import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Utils } from '@utils/index';
import { BREAK_POINT_MOBILE } from '@utils/display-width';
import { flexBox } from '@styles/styled-components/mixin';

import WikiContentsIndex from '@components/common/WikiContentsIndex';
import WikiCard from '@components/wiki-section/wiki-section-components/WikiCard';
import { WikiCategory } from '@components/wiki-section/wiki-section-components/WikiCategory';
import MainSection from '@components/common/MainSection';
import Loading from '@components/common/Loading';
import MdParser from '@components/common/MdParser';
import { docDataReducer, initialDocData } from '@src/reducer/doc-data-reducer';

const WikiSection = ({ generation, boostcampId, name }: { generation: number; boostcampId: string; name: string }) => {
  const [docData, docDispatch] = useReducer(docDataReducer, initialDocData);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const id = generation + boostcampId + name;

  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/api/documents/?generation=${generation}&boostcamp_id=${boostcampId}&name=${name}`);
      if (res.status === 200) {
        const { result } = await res.json();
        docDispatch({
          type: 'INPUT_DOC_DATA',
          payload: { ...result, classification: result.classifications },
        });
        setLoading(false);
      } else if (res.status === 404) {
        history.push(`/search?name=${generation}_${boostcampId}_${name}`);
      } else {
        setLoading(false);
        history.push('/error');
      }
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
          <WikiCategory categories={docData.classification} />
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

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${flexBox({ direction: 'column', alignItems: 'center' })};
  }
`;

export default WikiSection;
