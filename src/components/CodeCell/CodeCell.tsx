import { useEffect } from "react";

import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../features/cells/initialState";
import { updateCell } from "../../features/cells/cellsSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { createBundle } from "../../features/bundles/bundlesSlice";
import "./CodeCell.css";
import { RootState } from "../../store/store";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useDispatch();
  const bundle = useSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  const dispatchCreateBundle = () => {
    dispatch(
      createBundle({
        payload: { cellId: cell.id, input: cumulativeCode },
        type: "bundles/createBundle",
      })
    );
  };

  useEffect(() => {
    // If there is no bundle, create one
    // This is for initializating and when bundle is cached
    if (!bundle) {
      dispatchCreateBundle();
      return;
    }
    // debounce the bundle creation when user is typing
    const timer = setTimeout(async () => {
      dispatchCreateBundle();
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.id]);

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
