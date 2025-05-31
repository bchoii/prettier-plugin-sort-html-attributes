import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },
  external: ["prettier", "prettier/plugins/typescript"],
  plugins: [typescript()],
};

export default config;
