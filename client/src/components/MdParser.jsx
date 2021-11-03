import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styled from 'styled-components';
import style from '../styles/MdParser.module.scss';

const MdParser = ({ content }) => {
  return (
    <div className={style.MdWrapper}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MdParser;
