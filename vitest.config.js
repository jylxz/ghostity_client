import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr"
import {loadEnvConfig} from "@next/env"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts"
  },
});
