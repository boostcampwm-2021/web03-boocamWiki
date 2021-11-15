interface SelectTypeState {
  searchType: string;
  memberType: string;
}

type Action = { type: 'inputSearchType'; value: string } | { type: 'inputMemberType'; value: string };

export const selectTypeInitState: SelectTypeState = {
  searchType: '이름',
  memberType: '',
};

export const selectTypeReducer = (state: SelectTypeState, action: Action): SelectTypeState => {
  switch (action.type) {
    case 'inputSearchType':
      return {
        ...state,
        searchType: action.value,
      };
    case 'inputMemberType':
      return {
        ...state,
        memberType: action.value,
      };
    default:
      return state;
  }
};
