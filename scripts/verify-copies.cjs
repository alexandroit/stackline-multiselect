const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { unzipSync } = require("fflate");

const root = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const copies = [
  ["src/stackline-multiselect.js", "dist/stackline-multiselect.js"],
  ["src/stackline-multiselect.js", "docs/stackline-multiselect.js"],
  ["src/stackline-multiselect.css", "dist/stackline-multiselect.css"],
  ["src/stackline-multiselect.css", "docs/stackline-multiselect.css"],
  ["src/demo.js", "docs/main.js"],
  ["src/demo.css", "docs/site.css"],
  ["README.md", "dist/README.md"]
];

for (const [source, target] of copies) {
  assert.deepEqual(
    fs.readFileSync(path.join(root, source)),
    fs.readFileSync(path.join(root, target)),
    `${target} must match ${source}`
  );
}

const versionFiles = [
  "README.md",
  "src/demo.js",
  "dist/direct-example.html",
  "docs/llms.txt",
  "docs/llms-full.txt"
];
for (const file of versionFiles) {
  assert.ok(fs.readFileSync(path.join(root, file), "utf8").includes(pkg.version), `${file} must mention ${pkg.version}`);
}

const archivePath = path.join(root, "dist", `stackline-multiselect-${pkg.version}.zip`);
assert.ok(fs.existsSync(archivePath), "the current direct-download ZIP must exist");
const archive = unzipSync(new Uint8Array(fs.readFileSync(archivePath)));
for (const file of ["stackline-multiselect.js", "stackline-multiselect.css", "direct-example.html", "README.md"]) {
  assert.ok(archive[file], `${file} must exist in the direct-download ZIP`);
  assert.deepEqual(Buffer.from(archive[file]), fs.readFileSync(path.join(root, "dist", file)));
}
assert.ok(archive.LICENSE, "LICENSE must exist in the direct-download ZIP");
assert.deepEqual(Buffer.from(archive.LICENSE), fs.readFileSync(path.join(root, "LICENSE")));

process.stdout.write("Generated source, docs, dist, and ZIP copies are synchronized.\n");
