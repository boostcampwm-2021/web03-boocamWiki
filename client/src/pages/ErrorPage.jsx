import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import logo from '../resource/img/logo.png';
import style from '../styles/scss/ErrorPage.module.scss';
import { flexBox } from '../styles/styled-components/mixin';

const CategoryLink = styled(Link)`
  color: #36a4f3;
  text-decoration: none;
`;

const Btn = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: #36a4f3;
`;

const Flexed = styled.div`
  ${flexBox({ justifyContent: 'space-between' })}
  width: 100%;
  box-sizing: border-box;
`;

const ErrorPage = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className={style.ErrorPageContainer}>
      <div className={style.ErrorModalWrapper}>
        <img src={logo} className={style.logo} alt="logo" />
        <div className={style.ErrorMessageWrapper}>
          <p className={style.ErrorMessageEn}>404 Not Found</p>
          <p className={style.ErrorMessageKr}>페이지를 찾을 수 없습니다</p>
        </div>
        <div className={style.ErrorGuideWrapper}>
          <p className={style.ErrorGuide}>죄송합니다</p>
          <p className={style.ErrorGuide}>관리자에게 문의해주세요</p>
          <p className={style.ErrorGuide}>oooo1111@naver.com</p>
        </div>
        <Flexed>
          <Btn type="button" onClick={goBack}>
            이전 페이지
          </Btn>
          <CategoryLink to="/">부캠위키 홈</CategoryLink>
        </Flexed>
      </div>
    </div>
  );
};
export default ErrorPage;
