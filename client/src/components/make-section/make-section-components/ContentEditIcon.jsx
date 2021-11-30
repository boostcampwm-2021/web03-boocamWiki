import React, { useCallback } from 'react';
import styled from 'styled-components';
import boldIcon from '@resource/img/bold-icon.svg';
import italicIcon from '@resource/img/italic-icon.svg';
import textLineIcon from '@resource/img/text-line-icon.svg';

const addDecoration = {
  bold: '**',
  italic: '*',
  strikeout: '~',
};

const isDecoInSelectRange = (content, decoration, prevStart, prevEnd, nextStart, nextEnd) => {
  const prevText = content.substring(prevStart, prevEnd);
  const nextText = content.substring(nextStart, nextEnd);
  if (prevText === nextText && prevText === decoration) {
    return true;
  }
  return false;
};

const makeNewContent = (content, decoration, start, end) => {
  const decoLen = decoration.length;
  let newSelectText = decoration + content.substring(start, end) + decoration;
  let totalContent = content.substring(0, start) + newSelectText + content.substring(end, content.lengt);
  if (isDecoInSelectRange(content, decoration, start, start + decoLen, end - decoLen, end)) {
    newSelectText = content.substring(start + decoLen, end - decoLen);
    totalContent = content.substring(0, start) + newSelectText + content.substring(end, content.lengt);
  } else if (isDecoInSelectRange(content, decoration, start - decoLen, start, end, end + decoLen)) {
    newSelectText = content.substring(start, end);
    totalContent =
      content.substring(0, start - decoLen) + newSelectText + content.substring(end + decoLen, content.lengt);
  }
  return totalContent;
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
