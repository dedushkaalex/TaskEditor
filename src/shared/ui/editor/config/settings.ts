import type { EditorProps } from "@monaco-editor/react";

export type Language = "javascript" | "typescript";

export type Theme = {
  id: string;
  label: string;
  color: string;
};

export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
];

export const LANGUAGE_CONFIG = {
  javascript: {
    id: "javascript",
    label: "javascript",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
  },
  typescript: {
    id: "typescript",
    label: "typescript",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
  },
};

export const DEFAULT_OPTIONS = {
  fixedOverflowWidgets: false,
  lineNumbers: "on",
  minimap: {
    enabled: false,
  },
  automaticLayout: true,
  cursorBlinking: "blink",
  scrollBeyondLastLine: true,
  renderWhitespace: "selection",
  fontFamily: '"Lexend Deca", Consolas, "Courier New", monospace',
  fontLigatures: true,
  smoothScrolling: false,
  contextmenu: true,
  renderLineHighlight: "line",
  lineHeight: 1.3,
  fontSize: 16,
  roundedSelection: true,
  stickyScroll: {
    enabled: true,
  },
  scrollbar: {
    verticalScrollbarSize: 14,
    horizontalScrollbarSize: 14,
  },
} as const satisfies EditorProps["options"];
