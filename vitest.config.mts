import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

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
      },
      setupFiles: ["dotenv/config", "./src/mocks/setup"],
    },
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
    envDir: ".env",
  });
};
