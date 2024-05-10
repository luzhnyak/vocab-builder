import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Answer, IUser, IWord, Result, SearchParams } from "./types";
import {
  addAnswer,
  currentUser,
  getAllWords,
  getOwnWords,
  getStatistics,
  getTasks,
  getWordsCategories,
  logout,
  signin,
  signup,
} from "./services/vocabApi";
import { showError } from "./services/showError";
import { AxiosError } from "axios";

interface TokenState {
  token: string | null;
  setTokenState: (token: string) => void;
}

export const useToken = create<TokenState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setTokenState: async (token) => {
          set(() => ({ token }));
        },
      }),
      { name: "token" }
    )
  )
);

interface AuthState {
  currentUser: IUser | null;
  isLogin: boolean;

  signup: (user: IUser) => void;
  signin: (user: IUser) => void;
  logout: () => void;
  getCurrentUser: () => void;
  setIsLogin: (value: boolean) => void;
}

export const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      currentUser: null,
      isLogin: false,
      setIsLogin: async (value) => {
        set(() => ({ isLogin: value }));
      },
      signup: async (user) => {
        try {
          const data = await signup(user);
          const tokenState = useToken.getState();
          tokenState.setTokenState(data.token);
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            set(() => ({ currentUser: null, isLogin: false }));
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
          }
        }
      },
      signin: async (user) => {
        try {
          const data = await signin(user);
          const tokenState = useToken.getState();
          tokenState.setTokenState(data.token);
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            set(() => ({ currentUser: null, isLogin: false }));
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
          }
        }
      },
      logout: async () => {
        try {
          await logout();
          const tokenState = useToken.getState();
          tokenState.setTokenState("");
          set(() => ({ currentUser: null, isLogin: false }));
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            set(() => ({ currentUser: null, isLogin: false }));
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
          }
        }
      },
      getCurrentUser: async () => {
        try {
          const data = await currentUser();
          set(() => ({ currentUser: data, isLogin: true }));
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            set(() => ({ currentUser: null, isLogin: false }));
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
          }
        }
      },
    }),
    { name: "auth" }
  )
);

interface WordsState {
  categories: string[] | null;
  category: string;
  keyword: string | null;
  page: number;
  refresh: boolean;
  isIrregular: boolean;
  allWords: { results: IWord[]; totalPages: number } | null;
  ownWords: { results: IWord[]; totalPages: number } | null;
  tasks: Answer[];
  result: Result[];
  trainingCount: number;
  setTrainingCount: () => void;
  setWordsCategory: (category: string) => void;
  setIsIrregular: (isIrregular: boolean) => void;
  setKeyword: (keyword: string) => void;
  setPage: (page: number) => void;
  setRefresh: (refresh: boolean) => void;
  getWordsCategories: () => void;
  getAllWords: (searchParams: SearchParams) => void;
  getOwnWords: (searchParams: SearchParams) => void;
  getTasks: () => void;
  addAnswer: (answers: Answer[]) => void;
}

export const useWords = create<WordsState>()(
  devtools(
    (set) => ({
      categories: null,
      category: "all",
      keyword: null,
      page: 1,
      refresh: true,
      isIrregular: false,
      allWords: null,
      ownWords: null,
      tasks: [],
      result: [],
      trainingCount: 0,
      setTrainingCount: async () => {
        const { totalCount } = await getStatistics();
        set(() => ({ trainingCount: totalCount }));
      },
      setWordsCategory: async (category) => {
        set(() => ({ category: category }));
      },
      setKeyword: async (keyword) => {
        set(() => ({ keyword: keyword }));
      },
      setPage: async (page) => {
        set(() => ({ page }));
      },
      setRefresh: async (refresh) => {
        set(() => ({ refresh }));
      },
      setIsIrregular: async (isIrregular) => {
        set(() => ({ isIrregular }));
      },
      getWordsCategories: async () => {
        try {
          const data = await getWordsCategories();
          set(() => ({ categories: data }));
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
            const authState = useAuth.getState();
            authState.setIsLogin(false);
          }
        }
      },
      getAllWords: async (searchParams: SearchParams) => {
        try {
          const data = await getAllWords(searchParams);
          set(() => ({ allWords: data }));
        } catch (error) {
          if ((error as AxiosError).response?.status === 401) {
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
            const authState = useAuth.getState();
            authState.setIsLogin(false);
          }
        }
      },
      getOwnWords: async (searchParams: SearchParams) => {
        try {
          const data = await getOwnWords(searchParams);
          set(() => {
            return { ownWords: data };
          });
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
            const authState = useAuth.getState();
            authState.setIsLogin(false);
          }
        }
      },
      getTasks: async () => {
        try {
          const { tasks } = await getTasks();
          set(() => {
            return { tasks };
          });
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
            const authState = useAuth.getState();
            authState.setIsLogin(false);
          }
        }
      },
      addAnswer: async (answers) => {
        try {
          const data = await addAnswer(answers);
          set(() => {
            return { result: data };
          });
        } catch (error) {
          showError(error as AxiosError);
          if ((error as AxiosError).response?.status === 401) {
            const tokenState = useToken.getState();
            tokenState.setTokenState("");
            const authState = useAuth.getState();
            authState.setIsLogin(false);
          }
        }
      },
    }),
    { name: "words" }
  )
);
