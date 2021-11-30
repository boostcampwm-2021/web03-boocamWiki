import React from 'react';
import styled from 'styled-components';
import { font } from '@styles/styled-components/mixin';

const AgreementContentWrapper = styled.div`
  text-align: center;
  ${font({ size: '16px', weight: '400', color: '#000000' })}

  b {
    ${font({ size: '18px', weight: '700', color: '#000000' })}
  }
`;

const AgreementContent = () => {
  return (
    <AgreementContentWrapper>
      <div>
        <p>해당 서비스는 부스트캠프 멤버를 위한 위키입니다.</p>
        <p>
          <b>멤버가 아닌 경우에는 가입하실 수 없습니다.</b>
        </p>
      </div>
      &nbsp;
      <div>
        <p>규정에 어긋나는 행위 또는 부캠 멤버가 아닌 경우,</p>
        <p>관리자의 계정 제재조치가 있을 수 있습니다.</p>
      </div>
    </AgreementContentWrapper>
  );
};

export default AgreementContent;
