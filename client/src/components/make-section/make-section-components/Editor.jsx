import React from 'react';
import styled from 'styled-components';
import { font } from '../../../styles/styled-components/mixin';

const Editor = ({ docData, docDispatch }) => {
  const changeHandler = (e) => {
    docDispatch({
      type: 'INPUT_CONTENT',
      content: e.target.value,
    });
  };
  return <EditorBox onChange={changeHandler} value={docData.content} />;
};

const EditorBox = styled.textarea`
  ${font({size: "16px", weight: "500"})};
  width: 100%;
  height: 432px;
  resize: none;
  background: #f6f6f6;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  padding: 10px;
`;

export default Editor;
