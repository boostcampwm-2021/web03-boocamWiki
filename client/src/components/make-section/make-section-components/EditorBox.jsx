import React, { useState } from "react";
import styled from "styled-components";
import EditorWithPreview from './EditorWithPreview';
import Editor from './Editor';
import Preview from './Preview';

const EditorType = styled.div`
  display: flex;
`;

const EditorTypeBtn = styled.button`
  width: 80px;
  background-color: white;
  border: 1px solid gray;
`;

const EditorBox = ({docData, dispatch}) => {
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
    <>
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
    </>
  )
}

export default EditorBox;