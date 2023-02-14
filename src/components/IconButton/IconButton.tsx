import { IconWeight } from "phosphor-react";
import "./IconButton.css";
interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  rounded?: boolean;
}

export interface IconProps {
  size: number;
  weight: IconWeight;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, onClick, rounded } = props;
  return (
    <button
      className={`button is-primary ${rounded ? "is-rounded" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
