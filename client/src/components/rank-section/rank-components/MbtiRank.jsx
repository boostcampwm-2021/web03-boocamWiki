import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE } from '../../../utils/display-width';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { MBTIColor } from './style';
import Loading from '../../common/Loading';

const MbtiRank = () => {
  const [mbtiCount, setMbtiCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMbtiCount = async () => {
      const res = await fetch('/api/rank/mbti');
      if (res.status === 200) {
        const { result } = await res.json();
        setMbtiCount(result);
        setLoading(false);
      }
    };

    getMbtiCount();
  }, []);

  return (
    <MbtiRankContainer>
      {loading && <Loading />}
      {!loading && (
        <>
          <MbtiPieChartWrapper>
            <ChartTitle>부캠 MBTI 순위</ChartTitle>
            <MbtiPieChartSVG>
              <MbtiCircle cx="155" cy="155" r="130" />
            </MbtiPieChartSVG>
          </MbtiPieChartWrapper>
          <MbtiListWrapper>
            <p>리스트</p>
          </MbtiListWrapper>
        </>
      )}
    </MbtiRankContainer>
  );
};

const MbtiRankContainer = styled.div`
  ${flexBox({ direction: 'row', justifyContent: 'center', alignItems: 'center' })};
  width: 710px;
  height: 458px;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const MbtiPieChartWrapper = styled.div`
  width: 355px;
  height: 458px;
  position: relative;
`;

const MbtiListWrapper = styled.div`
  ${flexBox({ display: 'column', justifyContent: 'center', alignItems: 'center' })}
  width: 355px;
  height: 458px;
  padding: 15px 0;
`;

const ChartTitle = styled.p`
  ${font({ color: '#222222', size: '18px', weight: '500' })};
  position: absolute;
  top: 15px;
  left: 15px;
`;

const MbtiPieChartSVG = styled.svg`
  position: absolute;
  left: 23px;
  top: 70px;
  width: 310px;
  height: 310px;
`;

const MbtiCircle = styled.circle`
  fill: transparent;
  stroke-width: 50;
  stroke: ${MBTIColor.ENFJ};
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
`;

export default MbtiRank;
