import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 8000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/app.ts",
      exportName: "viteNodeApp",
      initAppOnBoot: false,
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
  optimizeDeps: {},
});
