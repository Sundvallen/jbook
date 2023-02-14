import { Cell } from "../../features/cells/initialState";
import CodeCell from "../CodeCell/CodeCell";
import TextEditor from "../TextEditor/TextEditor";
import ActionBar from "../ActionBar/ActionBar";
import AddCellBar from "../AddCellBar/AddCellBar";
import "./CellListItem.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const renderedItem =
    cell.type === "code" ? (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-list-item">{renderedItem}</div>;
};

export default CellListItem;
