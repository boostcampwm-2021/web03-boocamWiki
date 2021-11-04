export interface DocumentsSearch {
  generation?: number;
  boostcamp_id?: string;
  name?: string;
}

export interface DocumentsCreate {
  user_id?: String;
  generation?: String;
  boostcamp_id?: String;
  name?: String;
  content?: String;
  nickname?: String;
  language?: String;
  location?: String;
  field?: String;
  mbti?: String;
  link?: String;
  user_image?: String;
}
