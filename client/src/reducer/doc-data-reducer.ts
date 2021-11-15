interface DocData {
  generation: number;
  boostcamp_id: string;
  name: string;
  content: string;
  nickname: string;
  location: string;
  language: string;
  user_image: string;
  mbti: string;
  field: string;
  link: string;
  classification: 'camper' | 'master' | 'manager';
}

export const initialDocData = {
  generation: 0,
  boostcamp_id: '',
  name: '',
  content: '',
  nickname: null,
  location: null,
  language: null,
  user_image: null,
  mbti: null,
  field: null,
  link: null,
  classification: 'camper',
};

export const docDataReducer = (state: DocData, action: any): DocData => {
  switch (action.type) {
    case 'INPUT_TITLE':
      return { ...state, generation: action.generation, boostcamp_id: action.boostcamp_id, name: action.name };
    case 'INPUT_BOOSTCAMP_ID':
      return { ...state, boostcamp_id: action.boostcamp_id };
    case 'INPUT_GENERATION':
      return { ...state, generation: action.generation };
    case 'INPUT_NAME':
      return { ...state, name: action.name };
    case 'INPUT_CONTENT':
      return { ...state, content: action.content };
    case 'INPUT_CLASSIFICATION':
      return { ...state, classification: action.classification };
    case 'INPUT_USER_IMAGE':
      return { ...state, user_image: action.user_image };
    case 'INPUT_NICKNAME':
      return { ...state, nickname: action.nickname };
    case 'INPUT_LOCATION':
      return { ...state, location: action.location };
    case 'INPUT_LANGUAGE':
      return { ...state, language: action.language };
    case 'INPUT_MBTI':
      return { ...state, mbti: action.mbti };
    case 'INPUT_FIELD':
      return { ...state, field: action.field };
    case 'INPUT_LINK':
      return { ...state, link: action.link };
    case 'INPUT_DOC_DATA':
      return {...state, ...action };
    default:
      return state;
  }
};
