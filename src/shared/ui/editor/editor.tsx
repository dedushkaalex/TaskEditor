import { useMemo } from "react";

import { type EditorProps, Editor as MonacoEditor } from "@monaco-editor/react";

import { DEFAULT_OPTIONS } from "./config/settings";
import { useEditor } from "./settings-store";

export const Editor = ({ options, value, onChange, ...props }: EditorProps) => {
  const settings = useEditor((state) => state.settings);

  const editorOptions = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      ...options,
    }),
    [options],
  );

  return (
    <MonacoEditor
      language={settings.language.value}
      {...props}
      options={{
        ...editorOptions,
        automaticLayout: true,
      }}
      value={value}
      onChange={onChange}
      theme={settings.theme.value}
    />
  );
};
