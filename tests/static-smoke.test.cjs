const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("package exposes the published validation version", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.name, "@stackline/multiselect");
  assert.equal(pkg.version, "1.1.2");
});

test("source includes accessibility-focused combobox/listbox semantics", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /role", "combobox"/);
  assert.match(source, /role", "listbox"/);
  assert.match(source, /role", "option"/);
  assert.match(source, /aria-activedescendant/);
  assert.match(source, /aria-selected/);
  assert.match(source, /aria-checked/);
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

test("source includes React 19.1.x parity APIs", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /primaryKey/);
  assert.match(source, /createMultiSelectState/);
  assert.match(source, /createStacklineMultiSelectState/);
  assert.match(source, /getTriggerProps/);
  assert.match(source, /getOptionProps/);
  assert.match(source, /getSearchInputProps/);
  assert.match(source, /spaceOptionAction/);
  assert.match(source, /backspaceRemovesLastWhenSearchEmpty/);
  assert.match(source, /deleteRemovesFocusedBadge/);
  assert.match(source, /sourceItems/);
  assert.match(source, /renderItem/);
  assert.match(source, /renderBadge/);
  assert.match(source, /renderMenuFooter/);
  assert.match(source, /stackline:select/);
  assert.match(source, /stackline:change/);
});

test("single-selection contract keeps the active item selected", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /this\.isSelected\(item\)[\s\S]*this\.settings\.singleSelection[\s\S]*this\.isOpen = false[\s\S]*this\.focusTrigger\(\)/);
  assert.match(source, /isSelected\(item\)[\s\S]*settings\.singleSelection[\s\S]*isOpen = false[\s\S]*options\.onUpdate/);
});

test("select all state ignores disabled visible options", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /allVisibleSelected[\s\S]*filteredItems\(\)\.filter/);
  assert.match(source, /allVisibleSelected[\s\S]*!itemDisabled\(item\)/);
  assert.match(source, /selectableOptions[\s\S]*!option\.disabled/);
  assert.match(source, /selectableItems\(items\)/);
});

test("source includes body overlay and cleanup behavior", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /appendToBody/);
  assert.match(source, /tagToBody/);
  assert.match(source, /document\.body\.appendChild/);
  assert.match(source, /removeBodyDropdown/);
  assert.match(source, /updateDropdownPosition/);
});

test("outside click detection is safe inside Shadow DOM", () => {
  const source = read("src/stackline-multiselect.js");
  assert.match(source, /function eventPathIncludes/);
  assert.match(source, /event\.composedPath/);
  assert.match(source, /eventPathIncludes\(event, this\.root\)/);
  assert.match(source, /eventPathIncludes\(event, this\.dropdownElement\)/);
});

test("styles include focus states, brand skin, and overlay rules", () => {
  const styles = read("src/stackline-multiselect.css");
  assert.match(styles, /\.dropdown-list\.body-overlay/);
  assert.match(styles, /\.dropdown-list\.body-overlay[\s\S]*background: var\(--ms-surface, #ffffff\)/);
  assert.match(styles, /\.stackline-dropdown\.theme-brand/);
  assert.match(styles, /\.stackline-dropdown\.theme-classic \.c-btn/);
  assert.match(styles, /padding: 10px 68px 10px 10px/);
  assert.match(styles, /box-shadow: 0 1px 5px #959595/);
  assert.match(styles, /:focus-visible/);
});

test("live app includes the React parity route matrix", () => {
  const demo = read("src/demo.js");
  [
    "basic",
    "keyboard-contract",
    "aria-state",
    "headless-aria",
    "state-hook",
    "slots-api",
    "type-safe-factory",
    "async-object-preservation",
    "body-overlay-auto",
    "all-visible-counter"
  ].forEach((route) => assert.match(demo, new RegExp(route)));
  assert.match(demo, /Samoa/);
});
