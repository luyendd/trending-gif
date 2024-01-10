import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig, UserConfig } from "vitest/config";

const vitestConfig = ({ mode }: { mode: string }): UserConfig => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const exclude = [...configDefaults.exclude, "**.config.**", "./src/services", ".next", ".eslintrc.js", "**/**.d.ts"];
  return defineConfig({
    plugins: [react()],
    test: {
      environment: "jsdom",
      clearMocks: true,
      globals: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "json-summary", "html"],
        reportOnFailure: true,
        thresholds: {
          lines: 80,
          branches: 80,
          functions: 80,
          statements: 80,
        },
        exclude,
      },
      exclude,
      setupFiles: ["dotenv/config", "./src/mocks/setup"],
    },
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
  });
};
export default vitestConfig;
