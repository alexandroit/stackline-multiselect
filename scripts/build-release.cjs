const fs = require("node:fs");
const path = require("node:path");
const { zipSync } = require("fflate");

const root = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const dist = path.join(root, "dist");

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
  fs.copyFileSync(path.join(root, source), path.join(root, target));
}

for (const file of fs.readdirSync(dist)) {
  if (/^stackline-multiselect-\d+\.\d+\.\d+\.zip$/.test(file) && file !== `stackline-multiselect-${pkg.version}.zip`) {
    fs.rmSync(path.join(dist, file));
  }
}

const archiveFiles = [
  ["stackline-multiselect.js", "dist/stackline-multiselect.js"],
  ["stackline-multiselect.css", "dist/stackline-multiselect.css"],
  ["direct-example.html", "dist/direct-example.html"],
  ["README.md", "dist/README.md"],
  ["LICENSE", "LICENSE"]
];
const archive = {};

for (const [name, source] of archiveFiles) {
  archive[name] = new Uint8Array(fs.readFileSync(path.join(root, source)));
}

const output = zipSync(archive, {
  level: 9,
  mtime: new Date(2000, 0, 1, 0, 0, 0)
});
fs.writeFileSync(path.join(dist, `stackline-multiselect-${pkg.version}.zip`), output);

process.stdout.write(`Built @stackline/multiselect ${pkg.version} release files.\n`);
