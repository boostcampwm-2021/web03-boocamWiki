import React from 'react';
import styled from 'styled-components';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { fileUploadValidator } from '../../../utils/validator';
import { getImgUrl, showErrorCode } from '../../../services/image-upload';
import imageUploadIcon from '../../../resource/img/image-upload-icon.svg';

const ContentImgUploadBtn = ({ docData, docDispatch }) => {
  const appendImageLink = (imgUrl, target) => {
    const { selectionStart, selectionEnd } = document.querySelector('textarea');
    if (selectionStart !== selectionEnd) return;
    const prevContent = !docData.content ? '' : docData.content;

    const markdownImg = `![${target.files[0].name}](${imgUrl})`;
    const content =
      prevContent.substring(0, selectionStart) +
      markdownImg +
      prevContent.substring(selectionStart, prevContent.length);
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
      const url = await getImgUrl(e.target.files[0], 1);
      appendImageLink(url, e.target);
    }
  };
  return (
    <>
      <UploadBtn type="file" id="imgUpload" accept="image/*" onChange={contentImgInput} />
      <UploadLabel htmlFor="imgUpload">
        <UploadIcon src={imageUploadIcon} alt="imgaeUploadBtn" />
      </UploadLabel>
    </>
  );
};

const UploadBtn = styled.input`
  display: none;
`;

const UploadIcon = styled.img`
  width: 25px;
  height: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const UploadLabel = styled.label`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
`;

export default ContentImgUploadBtn;
