import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import bundler from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    // Send input to bundler and get bundled code
    const output = await bundler(input);
    // Code which will be displayed in Preview
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="//Write your code here!"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
