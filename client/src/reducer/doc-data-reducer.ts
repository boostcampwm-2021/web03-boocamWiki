import { WordManager } from '@resource/message';

export interface DocData {
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
  member_type: string;
  classification: string[];
}

export const initialDocData = {
  generation: -1,
  boostcamp_id: '',
  name: '',
  content: '',
  nickname: '',
  location: '',
  language: '',
  user_image: '',
  mbti: '',
  field: '',
  link: '',
  member_type: WordManager.CAMPER,
  classification: [WordManager.CAMPER],
};

export const docDataReducer = (state: DocData, action: { type: string; payload: DocData }): DocData => {
  switch (action.type) {
    case 'INPUT_DOC_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
