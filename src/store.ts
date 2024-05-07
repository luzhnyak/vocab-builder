import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Answer, IUser, IWord, Result, SearchParams } from "./types";
import {
  addAnswer,
  currentUser,
  getAllWords,
  getOwnWords,
  getTasks,
  getWordsCategories,
  logout,
  signin,
  signup,
} from "./services/vocabApi";

interface AuthState {
  currentUser: IUser | null;
  isLogin: boolean;

  signup: (user: IUser) => void;
  signin: (user: IUser) => void;
  logout: () => void;
  getCurrentUser: () => void;
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        isLogin: true,
        signup: async (user) => {
          const data = await signup(user);
          set(() => ({ currentUser: data, isLogin: true }));
        },
        signin: async (user) => {
          const data = await signin(user);
          set(() => ({ currentUser: data, isLogin: true }));
        },
        logout: async () => {
          await logout();
          set(() => ({ currentUser: null, isLogin: false }));
        },
        getCurrentUser: async () => {
          const data = await currentUser();
          set(() => ({ currentUser: data, isLogin: true }));
        },
      }),
      { name: "auth" }
    )
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
      category: "verb",
      keyword: null,
      page: 1,
      refresh: true,
      isIrregular: false,
      allWords: null,
      ownWords: null,
      tasks: [],
      result: [],
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
        const data = await getWordsCategories();
        set(() => ({ categories: data }));
      },
      getAllWords: async (searchParams: SearchParams) => {
        const data = await getAllWords(searchParams);
        set(() => ({ allWords: data }));
      },
      getOwnWords: async (searchParams: SearchParams) => {
        const data = await getOwnWords(searchParams);
        set(() => {
          return { ownWords: data };
        });
      },
      getTasks: async () => {
        const { tasks } = await getTasks();
        set(() => {
          return { tasks };
        });
      },
      addAnswer: async (answers) => {
        const data = await addAnswer(answers);
        set(() => {
          return { result: data };
        });
      },
    }),
    { name: "words" }
  )
);
