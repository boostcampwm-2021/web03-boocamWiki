import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@styles/styled-components/mixin';
import MdParser from '../../common/MdParser';
import Editor from './Editor';

const EditorWithPreview = ({ docData, docDispatch, setIsBlock }) => {
  const withPreview = true;

  return (
    <EditorWrap>
      <HalfEditor>
        <Editor docData={docData} docDispatch={docDispatch} setIsBlock={setIsBlock} withPreview={withPreview} />
      </HalfEditor>
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
