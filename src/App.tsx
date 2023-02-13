import React from "react";
import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useSelector } from "./store/hooks";
import { RootState } from "./store/store";

export default function App() {
  const cells = useSelector((state: RootState) => state.data);
  return (
    <div>
      {Object.entries(cells).map(([id, cell]) => {
        if (cell.type === "code") {
          return <CodeCell content={cell.content} />;
        } else {
          return <TextEditor content={cell.content} />;
        }
      })}
    </div>
  );
}
