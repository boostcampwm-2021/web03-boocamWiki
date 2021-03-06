import React from 'react';
import styled from 'styled-components';
import { flexBox } from '@styles/styled-components/mixin';
import { BREAK_POINT_MOBILE } from '@utils/display-width';
import MdParser from '../../common/MdParser';

const GuideMd = `## π μ λͺ© μμ± κ°μ΄λ
- κΈ°μμ μμ΄λλ **μΊ νΌλ§** μλ ₯ κ°λ₯ν©λλ€.
- μμ΄λλ **μνλ²³**κ³Ό **μ«μ**λ§ μλ ₯ κ°λ₯ν©λλ€. μλ ₯μ΄ μλ  κ²½μ° ν/μ μ λλ¬μ£ΌμΈμ.
- μ΄λ¦μλ **νΉμλ¬Έμ** μλ ₯μ΄ λΆκ°λ₯ν©λλ€.
- μμ΄λμ μ΄λ¦μ **20 κΈμ**λ₯Ό λμ μ μμ΅λλ€.`;

const GuideSpecialMd = `**κΈ°μ, μμ΄λ, μ΄λ¦μ** λ±λ‘ ν **μμ μ΄ λΆκ°λ₯**ν©λλ€. μ€νμκ° μλλ‘ μ£Όμν΄ μ£ΌμΈμ!`;

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
