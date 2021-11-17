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

  const tmp = (e) => {
    // console.log(e);
    inputRef.current.focus();
  };

  const dropHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(inputRef.current.value);

    // if (e.dataTransfer.items) {
    //   const image = e.dataTransfer.items[0].getAsFile();
    //   const datas = new FormData();
    //   datas.append('image', image, image.name);
    //   const result = await fetch('/images', {
    //     method: 'POST',
    //     body: datas,
    //   });
    //   const url = await result.json();
    //   console.log(url);
    //   // 커서 위치에 url 추가하는 로직 필요
    // }

    // const { selectionStart, selectionEnd } = e.target;
    // console.log(selectionStart, selectionEnd);
    // console.log(docData.content.substring(selectionStart, selectionEnd));
  };

  return (
    <EditorBox
      onChange={changeHandler}
      onDragOver={tmp}
      onDrop={dropHandler}
      ref={inputRef}
      value={docData.content}
      isDragging
    />
  );
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
