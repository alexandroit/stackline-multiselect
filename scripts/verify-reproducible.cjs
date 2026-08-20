const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const archive = path.join(root, "dist", `stackline-multiselect-${pkg.version}.zip`);

function buildInTimezone(timezone) {
  const build = spawnSync(process.execPath, [path.join(__dirname, "build-release.cjs")], {
    cwd: root,
    env: { ...process.env, TZ: timezone },
    encoding: "utf8"
  });
  assert.equal(build.status, 0, build.stderr || build.stdout);
  return crypto.createHash("sha512").update(fs.readFileSync(archive)).digest("hex");
}

const toronto = buildInTimezone("America/Toronto");
const utc = buildInTimezone("UTC");
assert.equal(toronto, utc, "direct-download ZIP must be identical across timezones");

process.stdout.write(`Reproducible ZIP verified across UTC and Toronto: ${utc}\n`);
