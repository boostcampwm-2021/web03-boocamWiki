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
      console.log('select toggle error');
    }
  } else if (classList.includes('SelectRow')) {
    if (classList.includes('SelectSearchType')) {
      SelectTypeDispatch({ type: 'inputSearchType', value: event.target.innerHTML });
    } else if (classList.includes('SelectUserInfo')) {
      // 로그인, 로그아웃, 정보수정 등등 관련 처리
    } else if (classList.includes('SelectPeopleType')) {
      SelectTypeDispatch({ type: 'inputMemberType', value: event.target.innerHTML });
    } else {
      console.log('select type error');
    }
    selectTgDispatch({ type: 'allOff' });
  } else {
    selectTgDispatch({ type: 'allOff' });
  }
};
