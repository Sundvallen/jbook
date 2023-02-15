import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

// Declare
let service: esbuild.Service;

export default async (rawCode: string) => {
  if (!service) {
    // Create a new service if it doesnt exist
    service = await esbuild.startService({
      worker: true,
      // running esbuild compiler IN browser
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    // Run bundler if service exists
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      // Pass the input value to the esbuild compiler plugin
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};
