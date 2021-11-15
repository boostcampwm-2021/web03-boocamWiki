interface SelectTgState {
  isSearchTypeOn: boolean;
  isUserInfoOn: boolean;
  isPeopleTypeOn: boolean;
}

type SelectTgAction =
  | { type: 'toggleSearchType' }
  | { type: 'toggleUserInfo' }
  | { type: 'togglePeopleType' }
  | { type: 'allOff' };

export const selectTgInitState: SelectTgState = {
  isSearchTypeOn: false,
  isUserInfoOn: false,
  isPeopleTypeOn: false,
};

export const selectTgReducer = (state: SelectTgState, action: SelectTgAction): SelectTgState => {
  switch (action.type) {
    case 'toggleSearchType':
      return {
        isSearchTypeOn: !state.isSearchTypeOn,
        isUserInfoOn: false,
        isPeopleTypeOn: false,
      };
    case 'toggleUserInfo':
      return {
        isSearchTypeOn: false,
        isUserInfoOn: !state.isUserInfoOn,
        isPeopleTypeOn: false,
      };
    case 'togglePeopleType':
      return {
        isSearchTypeOn: false,
        isUserInfoOn: false,
        isPeopleTypeOn: !state.isPeopleTypeOn,
      };
    case 'allOff':
      return {
        isSearchTypeOn: false,
        isUserInfoOn: false,
        isPeopleTypeOn: false,
      };
    default:
      return state;
  }
};
