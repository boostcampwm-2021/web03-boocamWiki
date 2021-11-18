import React, { useRef } from 'react';
import styled from 'styled-components';
import { font } from '../../../styles/styled-components/mixin';
import { fileUploadValidator, fileSizeError, fileFormatError } from '../../../utils/validator';

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

  const getImgUrl = async (item) => {
    const image = item.getAsFile();
    const datas = new FormData();
    datas.append('image', image, image.name);
    const result = await fetch('/api/images', {
      method: 'POST',
      body: datas,
    });
    const url = await result.json();
    const imgUrl = `![${image.name}](${url.imageLink})`;
    return imgUrl;
  };

  const sendToStorage = async (items) => {
    const itemArray = [...items];
    const result = await Promise.all(itemArray.map((item) => getImgUrl(item)));
    return result;
  };

  const showErrorCode = (errorCode) => {
    switch (errorCode) {
      case fileFormatError:
        alert('image 형식의 파일을 올려주세요');
        break;
      case fileSizeError:
        alert('15MB 이하의 이미지만 올려주세요');
        break;
      default:
        break;
    }
  };

  const appendImageLink = (imgUrl, target) => {
    const { selectionStart, selectionEnd } = target;
    const prevContent = docData.content;
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
      const errorCode = fileUploadValidator(e.dataTransfer.items);
      if (errorCode > 0) {
        showErrorCode(errorCode);
        return;
      }

      const resultUrl = await sendToStorage(e.dataTransfer.items);
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
