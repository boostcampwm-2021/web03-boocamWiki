export interface Document {
  generation: number;
  boostcamp_id: string;
  name: string;
}

export interface DocumentsSearch extends Document {
  content: string;
  offset: number;
  limit: number;
}

export interface DocumentsCreate extends Document {
  content: String;
  nickname: String;
  language: String;
  location: String;
  field: String;
  mbti: String;
  link: String;
  user_image: String;
}

export interface DocumentsUpdate extends DocumentsCreate {
  user_id: String;
  ip: String;
}

export interface DocumentsClassification extends DocumentsCreate {
  classification: string[];
}

export interface DocumentsView extends Document {
  total_count: String;
}

export interface DocumentsRecent extends Document {
  recent_created_at: String;
}

export const keyofDocumentsCreate = {
  generation: 0,
  boostcamp_id: 0,
  name: 0,
  content: 0,
  nickname: 0,
  language: 0,
  location: 0,
  field: 0,
  mbti: 0,
  link: 0,
  user_image: 0,
};

export const keyofDocumentsUpdate = {
  generation: 0,
  boostcamp_id: 0,
  name: 0,
  content: 0,
  nickname: 0,
  language: 0,
  location: 0,
  field: 0,
  mbti: 0,
  link: 0,
  user_image: 0,
  user_id: 0,
  ip: 0,
};

export interface GithubUserInfo {
  login: string;
  node_id: string;
  avatar_url: string;
}

export type TokenPayload = { validation: boolean; iat?: number; exp?: number } & GithubUserInfo;

export type DocumentsConcurrencyValidation = { generation; boostcamp_id; name; updated_at? };
export enum DocConcurrencyState {
  DOCDEFAULT = 0,
  DOCERASED = 1,
  DOCUPDATED = 2,
  DOCCREATED = 3,
}
