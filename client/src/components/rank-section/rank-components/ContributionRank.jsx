import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE } from '@utils/display-width';
import { font, flexBox } from '@styles/styled-components/mixin';
import Loading from '../../common/Loading';

const ContributionRank = () => {
  const [contributionCount, setContributionCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContributionCount = async () => {
      const res = await fetch('/api/rank/contribution');
      if (res.status === 200) {
        const { result } = await res.json();
        console.log('result : ', result);

        setContributionCount(result);
        setLoading(false);
      }
    };

    getContributionCount();
  }, []);

  return (
    <ContributionRankContainer>
      {loading && <Loading />}
      {!loading && (
        <>
          <GraphTitle>기여도 Top 10</GraphTitle>
          <GraphSVG>
            <g>
              <GraphLine x1="0" x2="0" y1="0" y2="300" />
              <GraphLine x1="30" x2="30" y1="0" y2="300" />
              <GraphLine x1="60" x2="60" y1="0" y2="300" />
              <GraphLine x1="90" x2="90" y1="0" y2="300" />
              <GraphLine x1="120" x2="120" y1="0" y2="300" />
              <GraphLine x1="150" x2="150" y1="0" y2="300" />
              <GraphLine x1="180" x2="180" y1="0" y2="300" />
            </g>
          </GraphSVG>
        </>
      )}
    </ContributionRankContainer>
  );
};

const GraphSVG = styled.svg`
  width: 100%;
  height: 418px;
  padding-top: 70px;
`;

const GraphLine = styled.line`
  stroke: #ecececf5;
  stroke-width: 2;
`;

const ContributionRankContainer = styled.div`
  width: 710px;
  height: 458px;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 40px;
  position: relative;
  padding: 20px;
`;

const GraphTitle = styled.p`
  ${font({ color: '#222222', size: '18px', weight: '600' })};
  position: absolute;
  top: 15px;
  left: 15px;
`;

export default ContributionRank;
