import axios, { AxiosError } from "axios";
import { IUser, IWord, IWordCreate } from "../types";
import { showError } from "./showError";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signin = async ({ email, password }: IUser) => {
  try {
    const { data } = await axios.post("/users/signin", { email, password });
    setToken(data.token);

    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const signup = async ({ name, email, password }: IUser) => {
  try {
    const { data } = await axios.post("/users/signup", {
      name,
      email,
      password,
    });

    setToken(data.token);

    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.post("/users/logout");

    clearToken();

    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const currentUser = async () => {
  try {
    const { data } = await axios.get("/users/current");

    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
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

export const getAllWords = async () => {
  try {
    const { data } = await axios.get("/words/all");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const getOwnWords = async () => {
  try {
    const { data } = await axios.get("/words/own");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
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
  try {
    const { data } = await axios.get("/words/tasks");
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};

export const addAnswer = async (answer: IWord) => {
  try {
    const { data } = await axios.post(`/words/answers`, answer);
    return data;
  } catch (error) {
    showError(error as AxiosError);
  }
};
