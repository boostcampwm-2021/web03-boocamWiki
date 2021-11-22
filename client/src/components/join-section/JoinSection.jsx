import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authFetch } from '../../utils/login';
import MainSection from '../common/MainSection';

const JoinSection = () => {
  const [answer, setAnswer] = useState('');
  const history = useHistory();
  const answerChange = (e) => {
    setAnswer(e.target.value);
  };

  const answerSubmit = async (e) => {
    e.preventDefault();
    const res = await authFetch('/api/auth/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    });
    const {
      result: { accessToken, refreshToken },
      msg,
    } = await res.json();
    if (res.status === 200) {
      window.sessionStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      alert('가입이 완료되었습니다.');
      history.push('/');
    } else if (msg === 'wrong answer') {
      alert('잘못된 답을 입력하셨습니다.');
    }

    setAnswer('');
  };

  return (
    <MainSection title="회원가입">
      <div>
        <p>부스트캠프 6기의 시작날짜는?</p>
        <input name="answer" type="text" value={answer} onChange={answerChange} />
        <button type="submit" onClick={answerSubmit}>
          보내기
        </button>
      </div>
    </MainSection>
  );
};

export default JoinSection;
