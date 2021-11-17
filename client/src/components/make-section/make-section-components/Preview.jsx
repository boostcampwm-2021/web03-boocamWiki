import React from 'react';
import styled from 'styled-components';
import MdParser from '../../common/MdParser';

const Preview = ({ docData }) => {
  return (
    <PreviewWrap>
      <MdParser content={docData.content} />
    </PreviewWrap>
  );
};

const PreviewWrap = styled.div`
  width: 100%;
  height: 432px;
  overflow: auto;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 10px;
`;

export default Preview;
