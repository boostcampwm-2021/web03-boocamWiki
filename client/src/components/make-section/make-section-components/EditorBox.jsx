import React, { useState } from 'react';
import styled from 'styled-components';
import EditorWithPreview from './EditorWithPreview';
import Editor from './Editor';
import Preview from './Preview';
import ContentImgUploadBtn from './ContentImgUploadBtn';
import { flexBox, font } from '../../../styles/styled-components/mixin';

const EditorBox = ({ docData, docDispatch }) => {
  const [inputStatus, setInputStatus] = useState('editor');

  const editorTypes = [
    { name: 'editor', text: '편집기', component: <Editor docData={docData} docDispatch={docDispatch} /> },
    { name: 'preview', text: '미리보기', component: <Preview docData={docData} /> },
    {
      name: 'editorWithPreview',
      text: '동시보기',
      component: <EditorWithPreview docData={docData} docDispatch={docDispatch} />,
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
        <ContentImgUploadBtn docData={docData} docDispatch={docDispatch} />
      </BoxHeader>

      {editorTypes.map((type) => (
        <EditorWrapper key={type.name}>{type.name === inputStatus ? type.component : <></>}</EditorWrapper>
      ))}
    </TotalBox>
  );
};

const TotalBox = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center' })};
  width: 100%;
  height: 500px;
  outline: 2px solid #d7d7d7;
  border-radius: 10px;
  margin-top: 21px;
`;

const BoxHeader = styled.div`
  ${flexBox({})}
  width: 100%;
  height: 43px;
  margin-bottom: 10px;
  background: #f6f6f6;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 2px solid #d7d7d7;
  padding-top: 7px;
  padding-left: 9px;
`;

const EditorTypeLabel = styled.label`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  ${font({ size: '16px', weight: '500' })};
  width: 81px;
  height: 36px;
  color: #222222;
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

const EditorWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export default EditorBox;
