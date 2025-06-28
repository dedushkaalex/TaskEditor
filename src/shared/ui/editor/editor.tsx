import { Editor as MonacoEditor } from "@monaco-editor/react";

export const Editor = () => {
  return (
    <MonacoEditor
      language={""}
      // options={{
      //   ...editorOptions,
      //   fontSize: settings.fontSize,
      //   tabSize: settings.tabSize
      // }}
      // value={value}
      // onChange={onChange}
      // theme={theme}
      // onMount={handleOnMount}
    />
  );
};
