import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import Title from './make-section-components/InputTitle';
import MakePageRule from './make-section-components/MakePageRule';
import DocCard from './make-section-components/DocCard';
import WikiContentsIndex from './make-section-components/WikiContentsIndex';
import EditorBox from './make-section-components/EditorBox';
import MainSection from '../common/MainSection';
import { BREAK_POINT_MOBILE } from '../../magic-number';
import { initialDocData, docDataReducer } from '../../reducer/doc-data-reducer';
import { font, flexBox } from '../../styles/styled-components/mixin';

const MakeSection = ({ history }) => {
  const [canMake, setCanMake] = useState();
  const [docRule, setDocRule] = useState(false);
  const [docData, docDispatch] = useReducer(docDataReducer, initialDocData);

  const handleRule = (e) => {
    if (e.target.checked) setDocRule(true);
    else setDocRule(false);
  };

  const addDocument = async () => {
    if (!canMake) alert('생성 가능 여부를 확인해주세요');
    else if (!docRule) alert('규정에 동의해주세요');
    else {
      await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docData),
      }).then((res) => res.json());
      history.push(`/w/${docData.generation}_${docData.boostcamp_id}_${docData.name}`);
    }
  };

  const cancelAddDoc = () => {
    history.goBack();
  };

  return (
    <MainSection title="문서 작성">
      <MainContent>
        <Title setCanMake={setCanMake} canMake={canMake} docData={docData} docDispatch={docDispatch} />

        <ListCardWrap>
          <WikiContentsIndex title="목차 미리보기" text={docData.content} />
          <DocCard docData={docData} docDispatch={docDispatch} />
        </ListCardWrap>

        <EditorBox docData={docData} docDispatch={docDispatch} />

        <RuleDiv>
          <input type="checkbox" style={{ margin: '10px' }} onChange={handleRule} />
          작성자는 아래 규정에 동의합니다.
        </RuleDiv>

        <ButtonWrap>
          <SubmitBtn onClick={addDocument}>등록</SubmitBtn>
          <CancelBtn onClick={cancelAddDoc}>취소</CancelBtn>
        </ButtonWrap>

        <MakePageRule />
      </MainContent>
    </MainSection>
  );
};

const MainContent = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center' })};
  padding: 0px 10px;
`;

const ListCardWrap = styled.div`
  ${flexBox({ justifyContent: 'space-between' })};
  height: fit-content;
  width: 100%;
  margin-top: 22px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${flexBox({ direction: 'column', alignItems: 'center' })};
  }
`;

const RuleDiv = styled.div`
  ${flexBox({ alignItems: 'center' })};
  color: red;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ButtonWrap = styled.div``;

const SubmitBtn = styled.button`
  ${font({ size: '24px', weight: 'bold' })};
  width: 100px;
  height: 40px;
  color: white;
  background-color: #0055fb;
  border-radius: 11px;
  text-align: center;
  border: none;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CancelBtn = styled.button`
  ${font({ size: '24px', weight: 'bold' })};
  width: 100px;
  height: 40px;
  color: white;
  background-color: #f45452;
  border-radius: 11px;
  text-align: center;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default MakeSection;
