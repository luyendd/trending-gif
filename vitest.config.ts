// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";
// import { resolve } from "node:path";

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: "jsdom",
//     globals: true,
//   },
//   resolve: {
//     alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
//   },
// });

import { defineConfig } from "vitest/config";
import { loadEnvConfig } from "@next/env";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default function ViteConfig() {
  // Load app-level env vars to node-level env vars.
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  return defineConfig({
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
    },
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
  });
}
