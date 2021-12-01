import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import WikiCard from './WikiCard';

describe('Mount 되자마자 처리되는 렌더링 테스트', () => {
  it('docData에 데이터가 없으면 card에 아무것도 보이면 안된다.', async () => {
    const name = 'TEST';
    render(<WikiCard docData={{}} name={name} />);
    await waitFor(() => screen.queryByRole('application', { name: 'card' }));
    const card = screen.queryByRole('application', { name: 'card' });
    expect(card).toBeNull();
  });
});

describe('useEffect 이후에 처리되는 렌더링 테스트 ', () => {
  it('name이 렌더링된다.', async () => {
    const docData = {
      mbti: 'INTP',
    };
    const name = 'TEST';
    render(<WikiCard docData={docData} name={name} />);
    await waitFor(() => screen.getByText(name));
    expect(screen.getByText(name)).toBeTruthy();
  });

  it('user_image가 있으면 이미지 태그가 렌더링 된다.', async () => {
    const docData = {
      user_image: 'https://dummy.com/dummy',
    };
    const name = 'TEST';
    render(<WikiCard docData={docData} name={name} />);
    await waitFor(() => screen.getByText(name));
    const img = screen.getByRole('img', { src: docData.user_image });
    expect(img).toBeTruthy();
  });

  it('user_image를 제외한 docData에 값이 있다면 렌더링이 된다.', async () => {
    const docData = {
      nickname: 'nickname',
      location: 'location',
      language: 'language',
      mbti: 'mbti',
      field: '',
    };
    const name = 'TEST';
    render(<WikiCard docData={docData} name={name} />);
    await waitFor(() => screen.getByText(name));
    expect(screen.getByText('별명')).toBeTruthy();
    expect(screen.getByText('지역')).toBeTruthy();
    expect(screen.getByText('주언어')).toBeTruthy();
    expect(screen.getByText('MBTI')).toBeTruthy();
  });

  it('링크에 instagram이 있다면 인스타그램 이미지가 로딩된다.', async () => {
    const docData = {
      link: 'instagram:test',
    };
    const name = 'TEST';
    render(
      <BrowserRouter>
        <WikiCard docData={docData} name={name} />
      </BrowserRouter>,
    );
    await waitFor(() => screen.getByText(name));
    const img = screen.getByAltText('link-img');
    expect(img).toBeTruthy();
  });
});
