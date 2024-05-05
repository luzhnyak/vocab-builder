import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IUser, IWord } from "./types";
import {
  addWord,
  createWord,
  currentUser,
  editWord,
  getAllWords,
  getOwnWords,
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
  allWords: { results: IWord[] } | null;
  ownWords: { results: IWord[] } | null;

  getWordsCategiries: () => void;
  createWord: (word: IWord) => void;
  addWord: (id: string) => void;
  editWord: (id: string, word: IWord) => void;
  getAllWords: () => void;
  getOwnWords: () => void;
}

export const useWords = create<WordsState>()(
  devtools(
    (set) => ({
      categories: null,
      allWords: null,
      ownWords: null,

      getWordsCategiries: async () => {
        const data = await getWordsCategories();

        set(() => ({ categories: data }));
      },
      createWord: async (word) => {
        const data = await createWord(word);

        set(() => ({ ownWords: data }));
      },
      addWord: async (id) => {
        const data = await addWord(id);

        set(() => ({ ownWords: data }));
      },
      editWord: async (id, word) => {
        const data = await editWord(id, word);

        set(() => ({ ownWords: data }));
      },
      getAllWords: async () => {
        const data = await getAllWords();

        set(() => ({ allWords: data }));
      },
      getOwnWords: async () => {
        const data = await getOwnWords();

        set(() => ({ ownWords: data }));
      },
    }),
    { name: "words" }
  )
);
