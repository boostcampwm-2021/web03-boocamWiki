import React from 'react';
import styled from 'styled-components';
import MdParser from '../../common/MdParser';
import { flexBox } from '../../../styles/styled-components/mixin';

const EditorWithPreview = ({ docData, docDispatch }) => {
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
  };

  return (
    <EditorWrap>
      <Editor onChange={changeHandler} value={docData.content} onDrop={dropHandler} />
      <Preview>
        <MdParser content={docData.content} />
      </Preview>
    </EditorWrap>
  );
};

const EditorWrap = styled.div`
  ${flexBox({})}
`;

const Editor = styled.textarea`
  width: 50%;
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
  width: 50%;
  height: 432px;
  overflow: auto;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 0px 10px 10px 0px;
`;

export default EditorWithPreview;
