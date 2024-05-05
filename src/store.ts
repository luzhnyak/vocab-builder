import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IUser, IWord } from "./types";
import {
  // addWord,
  // createWord,
  currentUser,
  // deleteWord,
  // editWord,
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

  getWordsCategories: () => void;
  // createWord: (word: IWordCreate) => void;
  // addWord: (id: string) => void;
  // deleteWord: (id: string) => void;
  // editWord: (id: string, word: IWordCreate) => void;
  getAllWords: () => void;
  getOwnWords: () => void;
}

export const useWords = create<WordsState>()(
  devtools(
    (set) => ({
      categories: null,
      allWords: null,
      ownWords: null,

      getWordsCategories: async () => {
        const data = await getWordsCategories();
        set(() => ({ categories: data }));
      },
      // createWord: async (word) => {
      //   await createWord(word);
      //   await getOwnWords();
      // },
      // addWord: async (id) => {
      //   await addWord(id);
      // },
      // deleteWord: async (id) => {
      //   await deleteWord(id);
      // },
      // editWord: async (id, word) => {
      //   await editWord(id, word);
      // },
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
