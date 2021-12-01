import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { WikiCategory } from './WikiCategory';

describe('<WikiCategory>', () => {
  it('분류가 캠퍼라면 캠퍼가 Document 안에 존재해야한다.', () => {
    const categories = ['캠퍼'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('캠퍼')).toBeInTheDocument();
  });

  it('분류가 마스터라면 캠퍼가 Document 안에 존재해야한다.', () => {
    const categories = ['마스터'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('마스터')).toBeInTheDocument();
  });

  it('분류가 운영진이면 운영진이 Document 안에 존재해야한다.', () => {
    const categories = ['운영진'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('운영진')).toBeInTheDocument();
  });

  it('분류가 리뷰어이면 리뷰어가 Document 안에 존재해야한다.', () => {
    const categories = ['리뷰어'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('리뷰어')).toBeInTheDocument();
  });

  it('분류가 멘토이면 멘토가 Document 안에 존재해야한다.', () => {
    const categories = ['멘토'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('멘토')).toBeInTheDocument();
  });

  it('분류가 렌더링 되면 분류라는 단어가 문서 내 있어야 한다.', () => {
    const categories = [];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('분류')).toBeTruthy();
  });

  it('분류가 캠퍼, 7기라면 캠퍼, 7기가 Document 안에 존재해야한다.', () => {
    const categories = ['캠퍼', '7기'];
    const result = render(
      <BrowserRouter>
        <WikiCategory categories={categories} />
      </BrowserRouter>,
    );
    expect(result.getByText('캠퍼')).toBeInTheDocument();
    expect(result.getByText('7기')).toBeInTheDocument();
  });
});
