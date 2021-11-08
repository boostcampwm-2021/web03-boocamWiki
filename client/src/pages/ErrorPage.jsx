import React from 'react';

import logo from '../resource/img/logo.png';
import style from '../styles/scss/ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={style.ErrorPageContainer}>
      <div className={style.ErrorModalWrapper}>
        <img src={logo} className={style.logo} alt="logo" />
        <div className={style.ErrorMessageWrapper}>
          <p className={style.ErrorMessageEn}>404 Not Fount</p>
          <p className={style.ErrorMessageKr}>페이지를 찾을 수 없습니다</p>
        </div>
        <div className={style.ErrorGuideWrapper}>
          <p className={style.ErrorGuide}>죄송합니다</p>
          <p className={style.ErrorGuide}>관리자에게 문의해주세요</p>
          <p className={style.ErrorGuide}>oooo1111@naver.com</p>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
