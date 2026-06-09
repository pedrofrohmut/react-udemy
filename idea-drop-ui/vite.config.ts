import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import path from "node:path"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    // https://vite.dev/config/server-options#server-proxy
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    devtools(),
    tailwindcss(),
    viteReact(),
  ],
})

export default config
