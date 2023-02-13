import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";
import Resizable from "../Resizable/Resizable";

interface TextEditorProps {
  content: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ content }) => {
  const [value, setValue] = useState<string | undefined>(content);
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor card" ref={editorRef}>
        <div className="card-content">
          <MDEditor value={value} onChange={(val) => setValue(val)} />
        </div>
      </div>
    );
  }

  return (
    <Resizable direction="vertical">
      <div className="text-editor preview" onClick={() => setEditing(true)}>
        <MDEditor.Markdown source={value || "Click to edit"} />
      </div>
    </Resizable>
  );
};

export default TextEditor;
