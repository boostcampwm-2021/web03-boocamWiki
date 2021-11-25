import React from 'react';
import { removeAccessToken, removeRefreshToken } from '../utils/login';

export const clickHandler = (
  event: any,
  selectTgDispatch: React.Dispatch<any>,
  SelectTypeDispatch: React.Dispatch<any>,
  SelectTgStateRef: any,
) => {
  const classList = event.target.className.split(' ');
  if (classList.includes('TgSelect')) {
    if (classList.includes('SelectSearchType')) {
      selectTgDispatch({ type: 'toggleSearchType' });
    } else if (classList.includes('SelectUserInfo')) {
      selectTgDispatch({ type: 'toggleUserInfo' });
    } else if (classList.includes('SelectPeopleType')) {
      selectTgDispatch({ type: 'togglePeopleType' });
    } else {
      console.error('select toggle error');
    }
  } else if (classList.includes('SelectRow')) {
    if (classList.includes('SelectSearchType')) {
      SelectTypeDispatch({ type: 'inputSearchType', value: event.target.innerHTML });
    } else if (classList.includes('SelectUserInfo')) {
      if (event.target.innerText === '로그인') {
        window.location.href = '/login';
      } else if (event.target.innerText === '로그아웃') {
        removeAccessToken();
        removeRefreshToken();
        alert('로그아웃이 되었습니다.');
      }
    } else if (classList.includes('SelectPeopleType')) {
      SelectTypeDispatch({ type: 'inputMemberType', value: event.target.innerHTML });
    } else {
      console.error('select type error');
    }
    selectTgDispatch({ type: 'allOff' });
  } else {
    const { isSearchTypeOn, isUserInfoOn, isPeopleTypeOn } = SelectTgStateRef;
    if (!isSearchTypeOn && !isUserInfoOn && !isPeopleTypeOn) return;
    selectTgDispatch({ type: 'allOff' });
  }
};
