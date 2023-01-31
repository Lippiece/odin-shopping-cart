/* / <reference types="vitest" />
   / <reference types="vite/client" /> */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  define : { "process.env": {} },
  plugins: [ react(), viteCompression() ],
  resolve: { alias: { util: "util/" } },
  test   : {
    clearMocks : true,
    environment: "jsdom",
    globals    : true,
    open       : true,
    ui         : true,
    update     : true,
  },
});
