export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

export interface IWord {
  _id: string;
  en: string;
  ua: string;
  category: string;
  progress: number;
  isIrregular: boolean;
}

export interface IWordCreate {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface SearchParams {
  [key: string]: string;
}

export interface Answer {
  _id: string;
  ua?: string;
  en?: string;
  task: string;
}

export interface Result {
  _id: string;
  ua: string;
  en: string;
  task: string;
  isDone: boolean;
}
