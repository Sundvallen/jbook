import React from "react";
import CodeCell from "./components/CodeCell/CodeCell";
import TextEditor from "./components/TextEditor/TextEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { CellsData } from "./features/cells/initialState";

export default function App() {
  const state = useSelector((state: RootState) => state);
  return (
    <div>
      {state.order.map((id) => {
        const cell = state.data[id];
        if (cell.type === "code") {
          return <CodeCell content={cell.content} />;
        } else {
          return <TextEditor content={cell.content} />;
        }
      })}
    </div>
  );
}
