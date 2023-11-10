import { unstable_vitePlugin as remix } from "@remix-run/dev";
import morgan from "morgan";
import { defineConfig } from "vite";
import type { ViteDevServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// @ts-expect-error
import eslint from "vite-plugin-eslint";
import TurboConsole from "vite-plugin-turbo-console";

export default defineConfig({
  plugins: [
    TurboConsole(),
    eslint({ fix: true }),
    morganPlugin(),
    remix(),
    tsconfigPaths(),
  ],
  server: {
    // Automatically opens up the browser when we run npm run dev
    open: true,
  },
});

function morganPlugin() {
  return {
    name: "morgan-plugin",
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(morgan("tiny"));
      };
    },
  };
}
