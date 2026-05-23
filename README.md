# @stackline/multiselect

Vanilla JavaScript multiselect dropdown with built-in skins, search, grouped options, selection limits, templates, and a direct browser download.

It does not require Angular, React, Vue, a bundler, or any runtime dependency.

## Installation

```bash
npm install @stackline/multiselect
```

Verdaccio test registry:

```bash
npm install @stackline/multiselect@1.0.0 --registry http://192.168.3.52:4873 --save-exact
```

## Direct Download

Use the direct download when you do not want npm:

```text
https://github.com/alexandroit/stackline-multiselect/releases/download/v1.0.0/stackline-multiselect-1.0.0.zip
```

Extract the archive and copy these files into your project:

```text
stackline-multiselect.css
stackline-multiselect.js
```

Local direct download while the demo server is running:

```text
http://192.168.3.52:4310/dist/stackline-multiselect-1.0.0.zip
```

## Quick Start

```html
<link rel="stylesheet" href="./stackline-multiselect.css">

<div id="countries"></div>

<script src="./stackline-multiselect.js"></script>
<script>
  var dropdown = new StacklineMultiSelect("#countries", {
    data: [
      { id: 1, itemName: "Brazil" },
      { id: 2, itemName: "Canada" },
      { id: 3, itemName: "Portugal" }
    ],
    selected: [{ id: 2, itemName: "Canada" }],
    settings: {
      text: "Select countries",
      enableSearchFilter: true,
      theme: "material",
      skin: "material"
    }
  });
</script>
```

When using npm, reference the package files from `node_modules` or copy them into your public assets:

```html
<link rel="stylesheet" href="./node_modules/@stackline/multiselect/src/stackline-multiselect.css">
<script src="./node_modules/@stackline/multiselect/src/stackline-multiselect.js"></script>
```

## Features

- Multiple and single selection
- Search filter
- Select all and clear all
- Per-item remove button
- Global clear selected button
- Checkbox and no-checkbox modes
- Selection limit
- Badge overflow counter
- Grouped options
- Disabled state
- Empty state
- Long list scroll
- Local lazy rendering
- Item and chip templates
- Runtime skin switching
- Built-in `classic`, `material`, `dark`, and `custom` skins

## Settings

```js
settings: {
  idKey: "id",
  labelKey: "itemName",
  singleSelection: false,
  text: "Select",
  selectAllText: "Select all",
  unSelectAllText: "Clear all",
  clearAllText: "Clear selected items",
  enableCheckAll: true,
  enableSearchFilter: true,
  searchPlaceholderText: "Search",
  badgeShowLimit: 4,
  showClearAll: true,
  maxHeight: 260,
  showCheckbox: true,
  noDataLabel: "No data",
  theme: "classic",
  skin: "classic",
  disabled: false,
  groupBy: "",
  limitSelection: 0,
  lazyLoading: false
}
```

## Events

```js
var dropdown = new StacklineMultiSelect("#countries", {
  data: countries,
  selected: [],
  settings: { theme: "material" },
  onSelect: function (item, instance) {},
  onDeSelect: function (item, instance) {},
  onSelectAll: function (items, instance) {},
  onDeSelectAll: function (items, instance) {},
  onChange: function (items, instance) {},
  onOpen: function (items, instance) {},
  onClose: function (items, instance) {}
});
```

## API

```js
dropdown.setData(items);
dropdown.setSelected(items);
dropdown.setSettings({ badgeShowLimit: 2 });
dropdown.setTheme("dark");
dropdown.getSelected();
dropdown.destroy();
```

## Skins

Built-in skins:

- `classic`
- `material`
- `dark`
- `custom`

Switch the skin at runtime:

```js
dropdown.setTheme("dark");
```

The component adds `theme-{name}` to the internal `.stackline-dropdown` root. If the name is not one of the built-in skins, the component also adds `theme-custom`, so custom names inherit the customizable layout.

```js
dropdown.setTheme("brand");
```

```css
.stackline-dropdown.theme-brand {
  --stackline-ms-primary: #7c3aed;
  --stackline-ms-primary-soft: rgba(124, 58, 237, 0.14);
  --stackline-ms-surface: #ffffff;
  --stackline-ms-surface-soft: #f5f3ff;
  --stackline-ms-outline: #c4b5fd;
  --stackline-ms-outline-strong: #7c3aed;
  --stackline-ms-on-surface: #22183f;
  --stackline-ms-on-surface-muted: #6b5d80;
  --stackline-ms-chip-bg: #ede9fe;
  --stackline-ms-chip-text: #5b21b6;
}
```

## Templates

```js
new StacklineMultiSelect("#colors", {
  data: colors,
  selected: [],
  settings: { theme: "material" },
  badgeTemplate: function (item) {
    return '<span class="chip">' + item.itemName + '</span>';
  },
  itemTemplate: function (item) {
    return '<strong>' + item.itemName + '</strong><small>' + item.detail + '</small>';
  }
});
```

## Local Development

```bash
npm test
npm run build:direct
npm start
```

Demo URL:

```text
http://192.168.3.52:4310/
```

Direct example:

```text
http://192.168.3.52:4310/dist/direct-example.html
```

## License

MIT
