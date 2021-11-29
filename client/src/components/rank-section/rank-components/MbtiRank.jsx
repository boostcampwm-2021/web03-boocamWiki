import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE } from '../../../utils/display-width';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { MBTIColor } from './style';
import Loading from '../../common/Loading';
import MbtiList from './mbti-list-component/MbtiList';

const MbtiRank = () => {
  const [mbtiCount, setMbtiCount] = useState({ totalCount: 0, mountedList: [], countList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMbtiCount = async () => {
      const res = await fetch('/api/rank/mbti');
      if (res.status === 200) {
        const { result } = await res.json();
        let totalCount = 0;
        const mountedList = result.map((mbtiCount) => {
          totalCount += mbtiCount.count;
          return { mbti: mbtiCount.mbti, count: totalCount };
        });
        setMbtiCount({ totalCount, mountedList, countList: result });
        setLoading(false);
      }
    };

    getMbtiCount();
  }, []);

  const getReverseEle = (list, idx) => list[list.length - idx - 1];

  return (
    <MbtiRankContainer>
      {loading && <Loading />}
      {!loading && (
        <>
          <MbtiPieChartWrapper>
            <ChartTitle>부캠 MBTI 순위</ChartTitle>
            <MbtiPieChartSVG>
              {mbtiCount.mountedList.map((mbti, idx) => (
                <MbtiCircle
                  cx="155"
                  cy="155"
                  r="130"
                  color={MBTIColor[getReverseEle(mbtiCount.mountedList, idx).mbti]}
                  offset={getReverseEle(mbtiCount.mountedList, idx).count / mbtiCount.totalCount}
                  key={getReverseEle(mbtiCount.mountedList, idx).mbti}
                  keyFrame={getReverseEle(mbtiCount.mountedList, idx).mbti}
                />
              ))}
            </MbtiPieChartSVG>
          </MbtiPieChartWrapper>
          <MbtiListWrapper>
            {mbtiCount.countList.map((mbti, idx) => (
              <MbtiList
                order={idx + 1}
                mbti={mbti.mbti}
                color={MBTIColor[mbti.mbti]}
                ratio={Math.round((mbti.count * 100) / mbtiCount.totalCount)}
                count={mbti.count}
                key={mbti.mbti}
              />
            ))}
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

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${flexBox({ direction: 'column', alignItems: 'center' })};
    height: 916px;
  })
`;

const MbtiPieChartWrapper = styled.div`
  width: 355px;
  height: 458px;
  position: relative;
`;

const MbtiListWrapper = styled.div`
  ${flexBox({ direction: 'column', justifyContent: 'flex-start', alignItems: 'center' })}
  width: 355px;
  height: 458px;
  padding: 15px 0;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &:: -webkit-scrollbar {
    display: none;
  }
`;

const ChartTitle = styled.p`
  ${font({ color: '#222222', size: '18px', weight: '600' })};
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
  stroke: ${(props) => props.color || '#222222'};
  stroke-dasharray: 817;
  stroke-dashoffset: 817;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  animation: ${(props) => props.keyFrame} 1.5s forwards;
  @keyframes ${(props) => props.keyFrame} {
    from {
      stroke-dashoffset: 817;
    }
    to {
      stroke-dashoffset: ${(props) => (1 - props.offset) * 817};
    }
  }
`;

export default MbtiRank;
