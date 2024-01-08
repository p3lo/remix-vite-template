import { unstable_vitePlugin as remix } from '@remix-run/dev'
import morgan from 'morgan'
import { remixDevTools } from 'remix-development-tools/vite'
import { defineConfig, type ViteDevServer } from 'vite'
import TurboConsole from 'vite-plugin-turbo-console'
import tsconfigPaths from 'vite-tsconfig-paths'
import remixConfig from './remix.config'

export default defineConfig({
  plugins: [
    remixDevTools(),
    TurboConsole(),
    morganPlugin(),
    remix(remixConfig),
    tsconfigPaths(),
  ],
  server: {
    // Automatically opens up the browser when we run npm run dev
    open: true,
  },
})

function morganPlugin() {
  return {
    name: 'morgan-plugin',
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(morgan('tiny'))
      }
    },
  }
}
