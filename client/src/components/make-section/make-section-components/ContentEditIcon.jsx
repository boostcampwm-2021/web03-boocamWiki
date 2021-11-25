import React, { useCallback } from 'react';
import styled from 'styled-components';
import boldIcon from '../../../resource/img/bold-icon.svg';
import italicIcon from '../../../resource/img/italic-icon.svg';
import textLineIcon from '../../../resource/img/text-line-icon.svg';

const addDecoration = {
  bold: '**',
  italic: '*',
  strikeout: '~',
};

const includeDecoInSelectRange = (content, decoration, start, end, decoLen) => {
  const prevText = content.substring(start, start + decoLen);
  const nextText = content.substring(end - decoLen, end);
  if (prevText === nextText && prevText === decoration) {
    return true;
  }
  return false;
};

const notIncludeDecoInSelectRange = (content, decoration, start, end, decoLen) => {
  const prevText = content.substring(start - decoLen, start);
  const nextText = content.substring(end, end + decoLen);
  if (prevText === nextText && prevText === decoration) {
    return true;
  }
  return false;
};

const makeNewContent = (content, decoration, start, end) => {
  const decoLen = decoration.length;
  let newSelectText = decoration + content.substring(start, end) + decoration;
  let total = content.substring(0, start) + newSelectText + content.substring(end, content.lengt);

  if (includeDecoInSelectRange(content, decoration, start, end, decoLen)) {
    newSelectText = content.substring(start + decoLen, end - decoLen);
    total = content.substring(0, start) + newSelectText + content.substring(end, content.lengt);
  } else if (notIncludeDecoInSelectRange(content, decoration, start, end, decoLen)) {
    newSelectText = content.substring(start, end);
    total = content.substring(0, start - decoLen) + newSelectText + content.substring(end + decoLen, content.lengt);
  }

  return total;
};

const ContentEditIcon = ({ docData, docDispatch }) => {
  const editContentByBtn = useCallback(
    (e) => {
      const { selectionStart, selectionEnd } = document.querySelector('textarea');
      if (selectionStart !== selectionEnd) {
        const content = makeNewContent(docData.content, addDecoration[e.target.id], selectionStart, selectionEnd);
        docDispatch({
          type: 'INPUT_DOC_DATA',
          payload: {
            content,
          },
        });
      }
    },
    [docData.content],
  );
  return (
    <>
      <EditorIcon src={boldIcon} id="bold" alt="bold" onClick={editContentByBtn} />
      <EditorIcon src={italicIcon} id="italic" alt="italic" onClick={editContentByBtn} />
      <EditorIcon src={textLineIcon} id="strikeout" alt="strikeout" onClick={editContentByBtn} />
    </>
  );
};

const EditorIcon = styled.img`
  width: 25px;
  height: 25px;
  &:hover {
    cursor: pointer;
  }
`;

export default ContentEditIcon;
