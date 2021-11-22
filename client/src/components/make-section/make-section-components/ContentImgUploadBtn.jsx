import React from 'react';
import styled from 'styled-components';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { fileUploadValidator } from '../../../utils/validator';
import { getImgUrl, showErrorCode } from '../../../services/image-upload';

const ContentImgUploadBtn = ({ docData, docDispatch }) => {
  const appendImageLink = (imgUrl, target) => {
    const { selectionStart, selectionEnd } = target;
    if (selectionStart !== selectionEnd) return;
    const prevContent = !docData.content ? '' : docData.content;
    const content = `![${target.files[0].name}](${
      prevContent.substring(0, selectionStart) + imgUrl + prevContent.substring(selectionStart, prevContent.length)
    })`;

    docDispatch({
      type: 'INPUT_DOC_DATA',
      payload: {
        content,
      },
    });
  };

  const contentImgInput = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const errorCode = fileUploadValidator(e.target.files);
      if (errorCode > 0) {
        showErrorCode(errorCode);
        return;
      }
      console.log('hello');
      const url = await getImgUrl(e.target.files[0], 1);
      appendImageLink(url, e.target);
    }
  };
  return (
    <>
      <UploadBtn type="file" id="imgUpload" accept="image/*" onChange={contentImgInput} />
      <UploadLabel htmlFor="imgUpload">이미지 추가</UploadLabel>
    </>
  );
};

const UploadBtn = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  ${font({ size: '13px', weight: '500' })};
  width: 80px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export default ContentImgUploadBtn;
