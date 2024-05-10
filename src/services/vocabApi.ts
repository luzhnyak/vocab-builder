import axios, { AxiosError } from "axios";
import { Answer, IUser, IWordCreate, SearchParams } from "../types";
import { showError } from "./showError";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signin = async ({ email, password }: IUser) => {
  const { data } = await axios.post("/users/signin", { email, password });
  setToken(data.token);

  return data;
};

export const signup = async ({ name, email, password }: IUser) => {
  const { data } = await axios.post("/users/signup", {
    name,
    email,
    password,
  });

  setToken(data.token);

  return data;
};

export const logout = async () => {
  const { data } = await axios.post("/users/signout");

  clearToken();

  return data;
};

export const currentUser = async () => {
  const { data } = await axios.get("/users/current");
  return data;
};

export const getWordsCategories = async () => {
  try {
    const { data } = await axios.get("/words/categories");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const createWord = async (word: IWordCreate) => {
  try {
    const { data } = await axios.post("/words/create", word);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const addWord = async (id: string) => {
  try {
    const { data } = await axios.post(`/words/add/${id}`);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const editWord = async (id: string, word: IWordCreate) => {
  try {
    const { data } = await axios.patch(`/words/edit/${id}`, word);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getAllWords = async (params: SearchParams) => {
  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  if (params["category"] === "all") {
    delete params["category"];
    delete params["isIrregular"];
  }

  const searchParams = new URLSearchParams({ ...params });
  const queryString = searchParams.toString();

  const { data } = await axios.get("/words/all?" + queryString);
  return data;
};

export const getOwnWords = async (params: SearchParams) => {
  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  if (params["category"] === "all") {
    delete params["category"];
    delete params["isIrregular"];
  }

  const searchParams = new URLSearchParams({ ...params });
  const queryString = searchParams.toString();

  const { data } = await axios.get(`/words/own?` + queryString);
  return data;
};

export const deleteWord = async (id: string) => {
  try {
    const { data } = await axios.delete(`/words/delete/${id}`);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getStatistics = async () => {
  try {
    const { data } = await axios.get("/words/statistics");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getTasks = async () => {
  const { data } = await axios.get("/words/tasks");
  return data;
};

export const addAnswer = async (answers: Answer[]) => {
  const { data } = await axios.post(`/words/answers`, answers);
  return data;
};
