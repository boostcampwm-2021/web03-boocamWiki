import React from 'react';
import styled from 'styled-components';
import MdParser from '../../common/MdParser';
import { flexBox } from '../../../styles/styled-components/mixin';
import Editor from './Editor';

const EditorWithPreview = ({ docData, docDispatch }) => {
  return (
    <EditorWrap>
      <HalfEditor>
        <Editor docData={docData} docDispatch={docDispatch} />
      </HalfEditor>
      {/* <HalfEditor docData={docData} docDispatch={docDispatch} /> */}
      {/* <HalfEditor /> onChange={changeHandler} value={docData.content} onDrop={dropHandler} /> */}
      <Preview>
        <MdParser content={docData.content} />
      </Preview>
    </EditorWrap>
  );
};

const EditorWrap = styled.div`
  ${flexBox({})}
`;

const HalfEditor = styled.div`
  width: 50%;
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
