import { useDispatch } from "../../store/hooks";
import IconButton, { IconProps } from "../IconButton/IconButton";
import { Plus } from "phosphor-react";
import "./AddCellBar.css";
import { insertCell } from "../../features/cells/cellsSlice";

interface AddCellBarProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCellBar: React.FC<AddCellBarProps> = ({
  nextCellId,
  forceVisible,
}) => {
  const dispatch = useDispatch();

  const iconProps: IconProps = {
    size: 22,
    weight: "bold",
  };

  return (
    <div className={`buttons-container ${forceVisible ? "visible" : ""}`}>
      <IconButton
        rounded
        onClick={() => dispatch(insertCell({ id: nextCellId, type: "text" }))}
      >
        <Plus {...iconProps} />
        <div className="button-text">Text</div>
      </IconButton>
      <IconButton
        rounded
        onClick={() => dispatch(insertCell({ id: nextCellId, type: "code" }))}
      >
        <Plus {...iconProps} />
        <div className="button-text">Code</div>
      </IconButton>
      <div className="divider"></div>
    </div>
  );
};

export default AddCellBar;
