import React from 'react';
import MainSection from '../common/MainSection';
import MdParser from '../common/MdParser';
import { content } from './content';

const MainDoor = (): JSX.Element => {
  return (
    <MainSection title="대문">
      <MdParser content={content} />
    </MainSection>
  );
};

export default MainDoor;
