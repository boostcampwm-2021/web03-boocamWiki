import React, { useState } from 'react';
import { authFetch } from '../../utils/login';
import MainSection from '../common/MainSection';

const JoinSection = () => {
  const [answer, setAnswer] = useState('');
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
    const data = await res.json();
    console.log(data);
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
