const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("package exposes the Verdaccio validation version", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.name, "@stackline/multiselect");
  assert.equal(pkg.version, "1.0.5");
});

test("source includes ADA-friendly combobox/listbox semantics", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /role", "combobox"/);
  assert.match(source, /role", "listbox"/);
  assert.match(source, /role", "option"/);
  assert.match(source, /aria-activedescendant/);
  assert.match(source, /aria-selected/);
  assert.match(source, /function isActivationKey/);
  assert.match(source, /c-arrow-toggle/);
  assert.match(source, /c-remove/);
  assert.match(source, /selected-item/);
  assert.match(source, /focusTrigger/);
  assert.match(source, /focusOptionByKey/);
  assert.match(source, /focusOptionElement/);
  assert.match(source, /data-option-index/);
  assert.match(source, /renderableItems/);
  assert.match(source, /groupItems/);
  assert.match(source, /preventScroll/);
});

test("source includes body overlay and cleanup behavior", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /appendToBody/);
  assert.match(source, /tagToBody/);
  assert.match(source, /document\.body\.appendChild/);
  assert.match(source, /removeBodyDropdown/);
  assert.match(source, /updateDropdownPosition/);
});

test("styles include focus states, brand skin, and overlay rules", () => {
  const styles = read("src/stackline-multiselect.css");
  assert.match(styles, /\.dropdown-list\.body-overlay/);
  assert.match(styles, /\.stackline-dropdown\.theme-brand/);
  assert.match(styles, /\.stackline-dropdown\.theme-classic \.c-btn/);
  assert.match(styles, /padding: 10px 68px 10px 10px/);
  assert.match(styles, /box-shadow: 0 1px 5px #959595/);
  assert.match(styles, /:focus-visible/);
});
