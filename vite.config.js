import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base   : "/odin-shopping-cart/",
  define : { "process.env": {} },
  plugins: [ react(), viteCompression(), svgr(), ViteImageOptimizer() ],
  resolve: { alias: { util: "util/" } },
  test   : {
    clearMocks : true,
    environment: "jsdom",
    globals    : true,
    update     : true,
  },
});
