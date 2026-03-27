import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts",],
  format: ["cjs", "esm"],
  deps: { neverBundle: 'any-base' },
  clean: true,
  dts: true,
  sourcemap: "inline",
  minify: true,
  exports: true,
  outExtensions: (c) => {
    if (c.format === "cjs") {
      return { js: ".js", dts: ".d.ts" };
    }

    if (c.format === "es") {
      return { js: ".mjs", dts: ".d.mts" };
    }

    return {};
  },
});
