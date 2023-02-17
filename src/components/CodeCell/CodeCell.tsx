import { useEffect } from "react";

import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../features/cells/initialState";
import { updateCell } from "../../features/cells/cellsSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { createBundle } from "../../features/bundles/bundlesSlice";
import "./CodeCell.css";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const bundle = useSelector((state) => state.bundles[cell.id]);

  const dispatchCreateBundle = () => {
    createBundle({
      payload: { cellId: cell.id, input: cell.content },
      type: "bundles/createBundle",
    });
  };

  useEffect(() => {
    if (!bundle) {
      dispatchCreateBundle();
      return;
    }
    const timer = setTimeout(async () => {
      dispatchCreateBundle();
      return () => {
        clearTimeout(timer);
      };
    }, 750);
  }, [cell.content, cell.id]);
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
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <div className="progress-bar-container">
              <progress
                className="progress-bar progress is-small is-primary"
                max="100"
              >
                Loading
              </progress>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
