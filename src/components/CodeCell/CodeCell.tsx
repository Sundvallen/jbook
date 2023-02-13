import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import bundler from "../../bundler";
import Resizable from "../Resizable/Resizable";

interface CodeCellProps {
  content: string;
}

const CodeCell: React.FC<CodeCellProps> = ({ content }) => {
  const [input, setInput] = useState(content);
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Send input to bundler and get bundled code
      const output = await bundler(input);
      // Code which will be displayed in Preview
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

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
            initialValue={content}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
