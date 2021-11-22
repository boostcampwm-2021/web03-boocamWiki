import React, { useRef } from 'react';
import styled from 'styled-components';
import { font } from '../../../styles/styled-components/mixin';
import { fileUploadValidator } from '../../../utils/validator';
import { sendToStorage, showErrorCode } from '../../../services/image-upload';

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

  const fileDrops = (dataTransfer) => {
    return dataTransfer.files.length > 0;
  };

  const appendImageLink = (imgUrl, target) => {
    const { selectionStart, selectionEnd } = target;
    if (selectionStart !== selectionEnd) return;
    const prevContent = !docData.content ? '' : docData.content;
    const content =
      prevContent.substring(0, selectionStart) + imgUrl + prevContent.substring(selectionStart, prevContent.length);

    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        content,
      },
    });
  };

  const dropHandler = async (e) => {
    e.stopPropagation();

    if (fileDrops(e.dataTransfer)) {
      e.preventDefault();
      const errorCode = fileUploadValidator(e.dataTransfer.files);
      if (errorCode > 0) {
        showErrorCode(errorCode);
        return;
      }

      const resultUrl = await sendToStorage(e.dataTransfer.files);
      const imgUrl = resultUrl.join('\n');
      appendImageLink(imgUrl, e.target);
    }
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
