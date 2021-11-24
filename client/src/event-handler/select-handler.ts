import { removeAccessToken, removeRefreshToken } from '../utils/login';

export const selectHandler = (
  event: any,
  selectTgDispatch: React.Dispatch<any>,
  SelectTypeDispatch: React.Dispatch<any>,
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
        window.location.replace(
          `https://www.github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK_URL}`,
        );
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
    selectTgDispatch({ type: 'allOff' });
  }
};
