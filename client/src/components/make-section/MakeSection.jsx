import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import Title from './make-section-components/InputTitle';
import MakePageRule from './make-section-components/MakePageRule';
import DocCard from './make-section-components/DocCard';
import WikiContentsIndex from '../WikiContentsIndex';
import EditorBox from './make-section-components/EditorBox';

const Main = styled.div`
  width: 890px;
  height: 100%;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 10px;
`;

const ListCardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  width: 100%;
`;

const RuleDiv = styled.div`
  display: flex;
  align-items: center;
  color: red;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const ButtonWrap = styled.div``;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  background-color: #0055fb;
  border-radius: 11px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CancelBtn = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  background-color: #f45452;
  border-radius: 11px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const docDataReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_TITLE':
      return { ...state, generation: action.generation, boostcamp_id: action.boostcamp_id, name: action.name };
    case 'INPUT_BOOSTCAMP_ID':
      return { ...state, boostcamp_id: action.boostcamp_id };
    case 'INPUT_GENERATION':
      return { ...state, generation: action.generation };
    case 'INPUT_NAME':
      return { ...state, name: action.name };
    case 'INPUT_CONTENT':
      return { ...state, content: action.content };
    case 'INPUT_CLASSIFICATION':
      return { ...state, classification: action.classification };
    case 'INPUT_USER_IMAGE':
      return { ...state, user_image: action.user_image };
    case 'INPUT_NICKNAME':
      return { ...state, nickname: action.nickname };
    case 'INPUT_LOCATION':
      return { ...state, location: action.location };
    case 'INPUT_LANGUAGE':
      return { ...state, language: action.language };
    case 'INPUT_MBTI':
      return { ...state, mbti: action.mbti };
    case 'INPUT_FIELD':
      return { ...state, field: action.field };
    case 'INPUT_LINK':
      return { ...state, link: action.link };
    default:
      return state;
  }
};

const initialDocData = {
  generation: 0,
  boostcamp_id: '',
  name: '',
  content: '',
  nickname: null,
  location: null,
  language: null,
  user_image: null,
  mbti: null,
  field: null,
  link: null,
  classification: 'camper',
};

const MakeSection = ({ history }) => {
  const [canMake, setCanMake] = useState(false);
  const [docRule, setDocRule] = useState(false);
  const [docData, dispatch] = useReducer(docDataReducer, initialDocData);

  const handleRule = (e) => {
    if (e.target.checked) setDocRule(true);
    else setDocRule(false);
  };

  const addDocument = async () => {
    if (!canMake) alert('생성 가능 여부를 확인해주세요');
    else if (!docRule) alert('규정에 동의해주세요');
    else {
      await fetch('/documents', {
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
    <Main>
      <MainHeader title="문서 생성" />

      <Title setCanMake={setCanMake} canMake={canMake} docData={docData} dispatch={dispatch} />
      
      <ListCardWrap>
        <WikiContentsIndex title="목차 미리보기" text={docData.content} />
        <DocCard docData={docData} dispatch={dispatch} />
      </ListCardWrap>

      <div>
        <EditorBox docData={docData} dispatch={dispatch} />
      </div>

      <RuleDiv>
        <input type="checkbox" style={{ margin: '10px' }} onChange={handleRule} />
        작성자는 아래 규정에 동의합니다.
      </RuleDiv>

      <ButtonWrap>
        <SubmitBtn onClick={addDocument}>등록</SubmitBtn>
        <CancelBtn onClick={cancelAddDoc}>취소</CancelBtn>
      </ButtonWrap>

      <MakePageRule />
    </Main>
  );
};

export default MakeSection;
