import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    // Setup wasm esbuild service
    // Assign it to a ref
    ref.current = await esbuild.startService({
      worker: true,
      // running esbuild compiler IN browser
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const res = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      // Pass the input value to the esbuild compiler plugin
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // Reset the iframe html
    iframe.current.srcdoc = html;
    // Message the ifra with the compiled code
    iframe.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.err(err);
          }
        }, false);
        </script> 
      </body>
    </html>
      `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
