import React from 'react';
import styled from 'styled-components';
import MdParser from '../../MdParser';

const EditorWrap = styled.div`
  display: flex;
`;

const Editor = styled.textarea`
  width: 424px;
  height: 432px;
  resize: none;
  background: #f6f6f6;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px 0px 0px 10px;
  outline: none;
  padding: 10px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const Preview = styled.div`
  width: 424px;
  height: 432px;
  overflow: auto;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 0px 10px 10px 0px;
`;

const EditorWithPreview = ({ docData, dispatch }) => {
  const changeHandler = (e) => {
    dispatch({
      type: 'INPUT_CONTENT',
      content: e.target.value,
    });
  };
  return (
    <EditorWrap>
      <Editor onChange={changeHandler} value={docData.content} />
      <Preview>
        <MdParser content={docData.content} />
      </Preview>
    </EditorWrap>
  );
};

export default EditorWithPreview;
