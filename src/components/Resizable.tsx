import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactElement;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    // Debounce the resize event
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // Fix bug when resizing the window to smaller than the user set width of the element
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableBoxProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableBoxProps = {
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      className: "resize-horizontal",
      width: width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableBoxProps = {
      minConstraints: [Infinity, innerHeight * 0.1],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
