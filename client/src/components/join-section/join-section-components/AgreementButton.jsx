import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import { authFetch } from '../../../utils/login';

const ButtonWrapper = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
`;

const RegisterButton = styled.button`
  ${font({ color: '#ffffff', size: '18px', weight: 'bold' })}
  border: none;
  border-radius: 11px;
  background-color: #e8a20c;
  width: 150px;
  height: 40px;
  cursor: pointer;
`;

const BackButton = styled.p`
  ${font({ color: '#888888', size: '11px' })}
  text-decoration-line: underline;
  cursor: pointer;
`;

const AgreementButton = ({ _ref }) => {
  const history = useHistory();
  const toMain = () => {
    history.push('/');
  };
  const registSubmit = async (e) => {
    e.preventDefault();
    if (!_ref.current.checked) {
      alert('동의를 하셔야 회원가입을 하실 수 있습니다.');
    } else {
      try {
        const res = await authFetch('/api/auth/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const {
          result: { accessToken, refreshToken },
        } = await res.json();
        if (res.status === 200) {
          window.sessionStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          alert('가입이 완료되었습니다.');
          toMain();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <ButtonWrapper>
      <div>
        <RegisterButton type="submit" onClick={registSubmit}>
          회원가입
        </RegisterButton>
      </div>
      <BackButton onClick={toMain}>부스트캠프 멤버가 아닙니다</BackButton>
    </ButtonWrapper>
  );
};

export default AgreementButton;
