import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import Title from './make-section-components/InputTitle';
import EditorWithPreview from './make-section-components/EditorWithPreview';
import Editor from './make-section-components/Editor';
import Preview from './make-section-components/Preview';

const Main = styled.div`
  width: 1115px;
  height: 1200px;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 10px;
`;

const EditorType = styled.div`
  display: flex;
`;

const EditorTypeBtn = styled.button``;

const docDataReducer = (state, action) => {
  switch(action.type){
    case 'INPUT_TITLE':
      return {...state, generation: action.generation, boostcamp_id: action.boostcamp_id, name: action.name }
    case 'INPUT_CONTENT':
      return {...state, content: action.content }
    case 'INPUT_NICKNAME':
      return {...state, nickname: action.nickname }
    case 'INPUT_LOCATION':
      return {...state, location: action.location }
    case 'INPUT_LANGUAGE':
      return {...state, language: action.language }
    case 'INPUT_USER_IMAGE':
      return {...state, user_image: action.user_image }
    case 'INPUT_MBTI':
      return {...state, mbti: action.mbti }
    case 'INPUT_FIELD':
      return {...state, field: action.field }
    case 'INPUT_LINK':
      return {...state, link: action.link }
    case 'INPUT_CLASSIFICATION':
      return {...state, classification: action.classification }
    default:
      return state;
  }
}

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
}

const MakePageSection = ({ history }) => {
  const [canMake, setCanMake] = useState(false);
  const [inputStatus, setInputStatus] = useState('editor');
  const [docData, dispatch] = useReducer(docDataReducer, initialDocData);

  const editorTypes = [
    { name: 'editor', text: '편집기', component: <Editor docData={docData} dispatch={dispatch} /> },
    { name: 'preview', text: '미리보기', component: <Preview docData={docData} /> },
    {
      name: 'editorWithPreview',
      text: '동시보기',
      component: <EditorWithPreview docData={docData} dispatch={dispatch} />,
    },
  ];

  const handleBtn = (e) => {
    setInputStatus(e.target.value);
  };

  const addDocument = async () => {
    if (!canMake) alert('생성 가능 여부를 확인해주세요');
    else {
      await fetch('/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docData),
      })
        .then((res) => res.json());
      history.goBack();
    }
  };

  return (
    <Main>
      <MainHeader title="문서 생성" />
      <Title setCanMake={setCanMake} canMake={canMake} docData={docData} dispatch={dispatch} />
      <EditorType>
        {editorTypes.map((type) => (
          <div key={type.name}>
            <EditorTypeBtn onClick={handleBtn} value={type.name}>
              {type.text}
            </EditorTypeBtn>
          </div>
        ))}
      </EditorType>
      {editorTypes.map((type) => (
        <div key={type.name}>{type.name === inputStatus ? type.component : <></>}</div>
      ))}

      <button type="button" onClick={addDocument}>
        등록
      </button>
    </Main>
  );
};

export default MakePageSection;
