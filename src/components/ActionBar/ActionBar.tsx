import { deleteCell, moveCell } from "../../features/cells/cellsSlice";
import { useDispatch } from "../../store/hooks";
import { ArrowDown, ArrowUp, TrashSimple, IconWeight } from "phosphor-react";
import IconButton, { IconProps } from "../IconButton/IconButton";
import "./ActionBar.css";
interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  const iconProps: IconProps = {
    size: 22,
    weight: "bold",
  };

  return (
    <div className="action-bar">
      <IconButton onClick={() => dispatch(moveCell({ id, direction: "up" }))}>
        <ArrowUp {...iconProps} />
      </IconButton>
      <IconButton onClick={() => dispatch(moveCell({ id, direction: "down" }))}>
        <ArrowDown {...iconProps} />
      </IconButton>
      <IconButton onClick={() => dispatch(deleteCell({ id }))}>
        <TrashSimple {...iconProps} />
      </IconButton>
    </div>
  );
};

export default ActionBar;
