import React from 'react';
import styled from 'styled-components';
import { flexBox } from '../../styles/styled-components/mixin';
import MainSection from '../common/MainSection';
import MbtiRank from './rank-components/MbtiRank';

const RankSection = () => {
  return (
    <MainSection title="각종 순위">
      <RankCotainer>
        <MbtiRank />
      </RankCotainer>
    </MainSection>
  );
};

const RankCotainer = styled.div`
  ${flexBox({ directioin: 'column', justifyContent: 'center', alignItems: 'center' })};
  margin-top: 20px;
`;

export default RankSection;
