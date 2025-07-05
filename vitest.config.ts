import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/setup.ts",
        "src/setupTests.ts",
        "**/*.config.ts",
        "**/*.config.js",
        "**/coverage/**"
      ]
    },
    // Base configuration - includes all tests by default
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,tsx,jsx}",
      "src/test/**/*.{test,spec}.{js,mjs,cjs,ts,tsx,jsx}"
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*"
    ]
  },
});