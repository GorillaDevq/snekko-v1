import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/snekko-v1/",
  root: "static-site",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../.gh-pages",
    emptyOutDir: true,
  },
});
