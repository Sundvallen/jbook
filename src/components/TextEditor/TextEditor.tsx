import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../features/cells/initialState";
import { useDispatch } from "../../store/hooks";
import { updateCell } from "../../features/cells/cellsSlice";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const dispatch = useDispatch();
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
        <div className="">
          <MDEditor
            value={cell.content}
            onChange={(val) =>
              dispatch(updateCell({ id: cell.id, content: val || "" }))
            }
          />
        </div>
      </div>
    );
  }

  return (
    <Resizable direction="vertical">
      <div className="text-editor preview" onClick={() => setEditing(true)}>
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </Resizable>
  );
};

export default TextEditor;
