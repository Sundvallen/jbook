import React, { useEffect, useRef } from "react";
import { Bundle } from "../../features/bundles/bundlesSlice";
import { RootState } from "../../store/store";
import "./Preview.css";
interface PreviewProps {
  code: string;
  err: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // Reset the iframe html
    iframe.current.srcdoc = html;

    // Wait for the iframe to load
    setTimeout(() => {
      // Message the iframe with the compiled code
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
