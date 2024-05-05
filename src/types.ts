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
