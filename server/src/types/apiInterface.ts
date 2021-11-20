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
  user_id: String;
  content: String;
  nickname: String;
  language: String;
  location: String;
  field: String;
  mbti: String;
  link: String;
  user_image: String;
}

export interface DocumentsView extends Document {
  total_count: String;
}

export interface DocumentsRecent extends Document {
  recent_created_at: String;
}

export interface GithubUserInfo {
  login: string;
  node_id: string;
  name: string;
}

export interface User {
  user_id: string;
  provider: string;
  login: string;
  name: string | null;
}
