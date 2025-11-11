import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/251113_three-postprocessing/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sea: resolve(__dirname, "sea.html"),
        box: resolve(__dirname, "box.html"),
      },
    },
  },
});
