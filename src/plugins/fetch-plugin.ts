import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // Checks if package is already cached
        if (cachedResult) {
          return cachedResult;
        }

        // if not, get from unpkg
        const { data, request } = await axios.get(args.path);
        // declare result object
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // request.responseURL is a esbuild feature
          // will make it possible to see the last loaded file's path
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
