import { create } from "zustand";

import type { Language, Theme } from "./config/settings";

type EditorState = {
  settings: {
    theme: {
      value: Theme["id"];
      setTheme: (theme: Theme["id"]) => void;
    };
    language: {
      value: Language;
      setLanguage: (language: Language) => void;
    };
  };
};

export const useEditor = create<EditorState>((set) => ({
  settings: {
    theme: {
      value: "vs-dark",
      setTheme: (theme) =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme: {
              ...state.settings.theme,
              value: theme,
            },
          },
        })),
    },
    language: {
      value: "typescript",
      setLanguage: (language) =>
        set((state) => ({
          settings: {
            ...state.settings,
            language: {
              ...state.settings.language,
              value: language,
            },
          },
        })),
    },
  },
}));
