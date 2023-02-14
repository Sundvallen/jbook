import { Fragment } from "react";
import { useSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import CellListItem from "../CellListItem/CellListItem";
import AddCellBar from "../AddCellBar/AddCellBar";
import "./CellList.css";

const CellList: React.FC = () => {
  // Order the cells by the order property
  // Cells are an array of Cells
  const cells = useSelector(({ order, data }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCellBar nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div className="list-container">
      {renderedCells}
      <AddCellBar forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
