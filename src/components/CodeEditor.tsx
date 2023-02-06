import React, { useRef } from "react";
import MonacoEditor, { Monaco, OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const handleEditorChange: OnChange = (value, event) => {
    if (value) {
      onChange(value);
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    // Get current value from editor
    const unformatted = editorRef.current.getModel()?.getValue();

    // // Format that value
    const formatted = prettier
      .format(unformatted!, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    // // Set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: true,
          automaticLayout: true,
        }}
        theme="vs-dark"
        language="javascript"
        height="500px"
      />
    </>
  );
};

export default CodeEditor;
