import { rm, cp } from "node:fs/promises";

const outdir = "build";

await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["./public/index.html"],
  outdir,
  minify: true,
  env: "REACT_APP_*",
  publicPath: "/",
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

// public/ holds a few files never referenced by a <script>/<link> tag
// (service-worker.js is registered at runtime via a plain string,
// manifest.json points at icons only from its own JSON content, ...).
// Bun's bundler only picks up assets it can see referenced from the HTML,
// so copy the rest of public/ verbatim, same as CRA used to.
await cp("public", outdir, {
  recursive: true,
  filter: (source) => !source.endsWith("index.html"),
});

console.log(`Build complete -> ${outdir}/`);
