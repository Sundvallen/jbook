import React, { useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactElement;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  useEffect(() => {
    const listener = () => {
      console.log(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableBoxProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableBoxProps = {
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      className: "resize-horizontal",
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
    };
  } else {
    resizableBoxProps = {
      minConstraints: [Infinity, window.innerHeight * 0.1],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
