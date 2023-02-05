import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);

        // Path for index file
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        // Path for relative paths in a module
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            // generate a "smart" url for packages
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }

        // Path for main file of a module
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

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
