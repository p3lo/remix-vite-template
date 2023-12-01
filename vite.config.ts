import type { ViteDevServer } from "vite";

import { unstable_vitePlugin as remix } from "@remix-run/dev";
import morgan from "morgan";
import { remixDevTools } from "remix-development-tools/vite";
import { defineConfig } from "vite";
// @ts-expect-error - No types available
import eslint from "vite-plugin-eslint";
import TurboConsole from "vite-plugin-turbo-console";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		remixDevTools(),
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
