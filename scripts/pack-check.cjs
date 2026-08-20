const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const destination = fs.mkdtempSync(path.join(os.tmpdir(), "stackline-multiselect-pack-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const packed = spawnSync(npm, ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], {
  cwd: root,
  encoding: "utf8"
});

assert.equal(packed.status, 0, packed.stderr || packed.stdout);
const report = JSON.parse(packed.stdout)[0];
const paths = report.files.map((file) => file.path);

for (const required of [
  "package.json",
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "SECURITY.md",
  "src/stackline-multiselect.js",
  "src/stackline-multiselect.css",
  "dist/stackline-multiselect.js",
  "dist/stackline-multiselect.css",
  `dist/stackline-multiselect-${pkg.version}.zip`,
  "types/stackline-multiselect.d.ts"
]) {
  assert.ok(paths.includes(required), `${required} is missing from the package`);
}

assert.equal(paths.some((file) => /(^|\/)(docs|tests|scripts|node_modules)\//.test(file)), false);
assert.deepEqual(
  paths.filter((file) => /^dist\/stackline-multiselect-\d+\.\d+\.\d+\.zip$/.test(file)),
  [`dist/stackline-multiselect-${pkg.version}.zip`]
);
assert.equal(report.version, pkg.version);

fs.rmSync(destination, { recursive: true, force: true });
process.stdout.write(`Package check passed: ${report.entryCount} files, ${report.size} bytes.\n`);
