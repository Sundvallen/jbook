import { Fragment } from "react";
import { useSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import CellListItem from "../CellListItem/CellListItem";
import AddCellBar from "../AddCellBar/AddCellBar";
import { store } from "../../store/store";
import "./CellList.css";

const selectOrderedCells = (state: RootState) => {
  const { order, data } = state.cells;
  return order.map((id) => data[id]);
};

const CellList: React.FC = () => {
  // Order the cells by the order property
  // Cells are an array of Cells
  const cells = useSelector(selectOrderedCells);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCellBar nextCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="list-container">
      <AddCellBar forceVisible={cells.length === 0} nextCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
