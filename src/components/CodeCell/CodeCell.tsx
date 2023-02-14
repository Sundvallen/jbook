import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import bundler from "../../bundler";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../features/cells/initialState";
import { updateCell } from "../../features/cells/cellsSlice";
import { useDispatch } from "../../store/hooks";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(async () => {
      // Send input to bundler and get bundled code
      const output = await bundler(cell.content);
      // Code which will be displayed in Preview
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) =>
              dispatch(updateCell({ id: cell.id, content: value }))
            }
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
