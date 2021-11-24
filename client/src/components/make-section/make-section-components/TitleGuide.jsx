import React from 'react';
import styled from 'styled-components';
import MdParser from '../../common/MdParser';
import { flexBox } from '../../../styles/styled-components/mixin';
import { BREAK_POINT_MOBILE } from '../../../magic-number';

const GuideMd = `## 📃 제목 작성 가이드
- 기수와 아이디는 **캠퍼만** 입력 가능합니다.
- 아이디는 **알파벳**과 **숫자**만 입력 가능합니다. 입력이 안될 경우 한/영 을 눌러주세요.
- 이름에는 **특수문자** 입력이 불가능합니다.
- 아이디와 이름은 **20 글자**를 넘을 수 없습니다.`;

const GuideSpecialMd = `**기수, 아이디, 이름은** 등록 후 **수정이 불가능**합니다. 오탈자가 없도록 주의해 주세요!`;

const TitleGuide = () => {
  return (
    <TitleGuideContainer>
      <MdParser content={GuideMd} />
      <MdParser content={GuideSpecialMd} color="#F45452" />
    </TitleGuideContainer>
  );
};

const TitleGuideContainer = styled.div`
  ${flexBox({ direction: 'column', justifyContent: 'center', alignItems: 'center' })};
  width: 635px;
  border: 1px solid #bbbbbb;
  margin-top: 20px;
  padding-bottom: 10px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 350px;
  }
`;

export default TitleGuide;
