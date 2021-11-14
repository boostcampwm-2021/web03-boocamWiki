import React, { useState } from 'react';
import styled from 'styled-components';
import EditorWithPreview from './EditorWithPreview';
import Editor from './Editor';
import Preview from './Preview';

const TotalBox = styled.div`
  width: 868px;
  height: 500px;
  border: 2px solid #d7d7d7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 21px;
`;

const BoxHeader = styled.div`
  width: 868px;
  height: 43px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  background: #f6f6f6;
  border-left: 2px solid #d7d7d7;
  border-right: 2px solid #d7d7d7;
  border-bottom: 2px solid #d7d7d7;
  border-radius: 5px 5px 0px 0px;
  padding-top: 7px;
  padding-left: 9px;
`;

const EditorTypeLabel = styled.label`
  width: 81px;
  height: 36px;
  color: #222222;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  border-bottom: 2px solid #d7d7d7;
`;

const EditorTypeRadio = styled.input`
  &:checked + label {
    background-color: white;
    border: 2px solid #d7d7d7;
    border-bottom: 2px solid white;
    border-radius: 5px 5px 0px 0px;
  }
  display: none;
`;

const EditorBox = ({ docData, dispatch }) => {
  const [inputStatus, setInputStatus] = useState('editor');

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

  return (
    <TotalBox>
      <BoxHeader>
        {editorTypes.map((type) => (
          <div key={type.name}>
            <EditorTypeRadio
              type="radio"
              id={type.name}
              name="typeRadio"
              value={type.name}
              onChange={handleBtn}
              checked={inputStatus === type.name}
            />
            <EditorTypeLabel htmlFor={type.name}>{type.text}</EditorTypeLabel>
          </div>
        ))}
      </BoxHeader>

      {editorTypes.map((type) => (
        <div key={type.name}>{type.name === inputStatus ? type.component : <></>}</div>
      ))}
    </TotalBox>
  );
};

export default EditorBox;
