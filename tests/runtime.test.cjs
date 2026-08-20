const assert = require("node:assert/strict");
const test = require("node:test");
const { Window } = require("happy-dom");

const modulePath = require.resolve("../src/stackline-multiselect.js");

function createEnvironment() {
  const window = new Window({ url: "https://example.test/" });
  global.window = window;
  global.document = window.document;
  global.CustomEvent = window.CustomEvent;
  global.Event = window.Event;
  global.MouseEvent = window.MouseEvent;
  global.Node = window.Node;
  global.Element = window.Element;
  delete require.cache[modulePath];

  return {
    window,
    StacklineMultiSelect: require(modulePath)
  };
}

function destroyEnvironment(environment, instance) {
  if (instance) {
    instance.destroy();
  }
  environment.window.close();
  delete require.cache[modulePath];
  delete global.window;
  delete global.document;
  delete global.CustomEvent;
  delete global.Event;
  delete global.MouseEvent;
  delete global.Node;
  delete global.Element;
}

function countries() {
  return [
    { id: 1, itemName: "Brazil" },
    { id: 2, itemName: "Canada" },
    { id: 3, itemName: "Portugal" }
  ];
}

test("CommonJS exports the constructor and headless factories", () => {
  const environment = createEnvironment();
  try {
    const Multiselect = environment.StacklineMultiSelect;
    assert.equal(typeof Multiselect, "function");
    assert.equal(typeof Multiselect.create, "function");
    assert.equal(typeof Multiselect.createState, "function");
    assert.equal(typeof Multiselect.createMultiSelectState, "function");
    assert.equal(typeof Multiselect.createStacklineMultiSelectState, "function");
  } finally {
    destroyEnvironment(environment);
  }
});

test("styled selectAll is idempotent", () => {
  const environment = createEnvironment();
  const mount = environment.window.document.createElement("div");
  environment.window.document.body.appendChild(mount);
  const instance = new environment.StacklineMultiSelect(mount, { data: countries() });

  try {
    instance.selectAll();
    assert.deepEqual(instance.getSelected().map((item) => item.id), [1, 2, 3]);
    instance.selectAll();
    assert.deepEqual(instance.getSelected().map((item) => item.id), [1, 2, 3]);
  } finally {
    destroyEnvironment(environment, instance);
  }
});

test("partial keyboard settings preserve existing overrides", () => {
  const environment = createEnvironment();
  const mount = environment.window.document.createElement("div");
  environment.window.document.body.appendChild(mount);
  const instance = new environment.StacklineMultiSelect(mount, {
    data: countries(),
    settings: { keyboard: { arrows: false, escape: true } }
  });

  try {
    instance.setSettings({ keyboard: { escape: false } });
    assert.equal(instance.settings.keyboard.arrows, false);
    assert.equal(instance.settings.keyboard.escape, false);
  } finally {
    destroyEnvironment(environment, instance);
  }
});

test("outside-click handling follows composed Shadow DOM paths", () => {
  const environment = createEnvironment();
  const shadowHost = environment.window.document.createElement("div");
  environment.window.document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  const mount = environment.window.document.createElement("div");
  shadowRoot.appendChild(mount);
  const instance = new environment.StacklineMultiSelect(mount, { data: countries() });

  try {
    instance.open();
    instance.dropdownElement.dispatchEvent(new environment.window.MouseEvent("click", {
      bubbles: true,
      composed: true
    }));
    assert.equal(instance.isOpen, true);

    environment.window.document.body.dispatchEvent(new environment.window.MouseEvent("click", {
      bubbles: true,
      composed: true
    }));
    assert.equal(instance.isOpen, false);
  } finally {
    destroyEnvironment(environment, instance);
  }
});

test("settings and prop bags reject prototype control keys", () => {
  const environment = createEnvironment();
  try {
    const malicious = JSON.parse('{"__proto__":{"polluted":"yes"},"prototype":{"polluted":"yes"},"constructor":{"polluted":"yes"},"skin":"dark"}');
    const state = environment.StacklineMultiSelect.createStacklineMultiSelectState({ settings: malicious });
    const props = state.getRootProps(malicious);

    assert.equal(Object.getPrototypeOf(state.settings), Object.prototype);
    assert.equal(Object.getPrototypeOf(props), Object.prototype);
    assert.equal(Object.prototype.hasOwnProperty.call(state.settings, "__proto__"), false);
    assert.equal(Object.prototype.hasOwnProperty.call(props, "constructor"), false);
    assert.equal({}.polluted, undefined);
    assert.equal(state.settings.skin, "dark");
  } finally {
    destroyEnvironment(environment);
  }
});

test("headless selection limits apply to item, group, and select-all actions", () => {
  const environment = createEnvironment();
  try {
    const items = countries();
    const state = environment.StacklineMultiSelect.createStacklineMultiSelectState({
      data: items,
      settings: { limitSelection: 1 }
    });

    state.toggleItem(items[0]);
    state.toggleItem(items[1]);
    assert.deepEqual(state.selectedItems.map((item) => item.id), [1]);
    assert.equal(state.visibleOptions[1].disabled, true);

    state.clear();
    state.selectAll();
    assert.deepEqual(state.selectedItems.map((item) => item.id), [1]);

    state.clear();
    state.toggleGroup("all", items);
    assert.deepEqual(state.selectedItems.map((item) => item.id), [1]);
  } finally {
    destroyEnvironment(environment);
  }
});
