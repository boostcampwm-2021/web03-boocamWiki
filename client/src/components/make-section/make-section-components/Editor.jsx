import React, { useRef } from 'react';
import styled from 'styled-components';
import { font } from '../../../styles/styled-components/mixin';

const Editor = ({ docData, docDispatch }) => {
  const inputRef = useRef(null);

  const changeHandler = (e) => {
    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        content: e.target.value,
      },
    });
  };

  const dropHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer.items) {
      const image = e.dataTransfer.items[0].getAsFile();
      const datas = new FormData();
      datas.append('image', image, image.name);
      const result = await fetch('/images', {
        method: 'POST',
        body: datas,
      });
      const url = await result.json();
      const imgUrl = `![사진](${url.imageLink})`;
      const { selectionStart, selectionEnd } = e.target;
      const prevContent = docData.content;
      const content =
        prevContent.substring(0, selectionStart) + imgUrl + prevContent.substring(selectionStart, prevContent.length);
      docDispatch({
        type: 'INPUT_DOC_DATA',
        payload: {
          content,
        },
      });
    }

    // const { selectionStart, selectionEnd } = e.target;
    // console.log(selectionStart, selectionEnd);
    // console.log(docData.content.substring(selectionStart, selectionEnd));
  };

  return <EditorBox onChange={changeHandler} onDrop={dropHandler} ref={inputRef} value={docData.content} isDragging />;
};

const EditorBox = styled.textarea`
  ${font({ size: '16px', weight: '500' })};
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
