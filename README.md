# @stackline/multiselect

> A framework-agnostic vanilla JavaScript multiselect dropdown with search, select all, grouping, templates, selection limits, runtime skins, and direct browser usage.

[![npm version](https://img.shields.io/npm/v/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![npm downloads](https://img.shields.io/npm/dt/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![npm monthly](https://img.shields.io/npm/dm/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![license](https://img.shields.io/npm/l/@stackline/multiselect.svg?style=flat-square)](https://github.com/alexandroit/stackline-multiselect/blob/main/LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/stackline-multiselect.svg?style=flat-square)](https://github.com/alexandroit/stackline-multiselect/stargazers)

**[Documentation & Live Demo](https://alexandro.net/docs/multiselect/)** | **[Direct Download](https://github.com/alexandroit/stackline-multiselect/releases/download/v1.0.2/stackline-multiselect-1.0.2.zip)** | **[npm](https://www.npmjs.com/package/@stackline/multiselect)** | **[Issues](https://github.com/alexandroit/stackline-multiselect/issues)** | **[Repository](https://github.com/alexandroit/stackline-multiselect)**

**Latest npm release:** `1.0.2`

---

## Why this library?

`@stackline/multiselect` is for applications that need a reliable multiselect without a framework dependency. It works with plain HTML, server-rendered pages, static sites, CMS templates, and framework apps that prefer to mount a small browser widget directly.

The package ships a single JavaScript file, a single CSS file, built-in skins, and a direct download bundle for projects that do not use npm.

## Features

| Feature | Supported |
| :--- | :---: |
| Framework-agnostic vanilla JavaScript | Yes |
| Multiple and single selection | Yes |
| Search and filter | Yes |
| Select all and clear all | Yes |
| Global clear selected button | Yes |
| Per-item remove buttons | Yes |
| Checkbox and no-checkbox modes | Yes |
| Selection limit | Yes |
| Badge overflow counter | Yes |
| Grouped options | Yes |
| Disabled and empty states | Yes |
| Long list scroll | Yes |
| Local lazy rendering | Yes |
| Item and chip templates | Yes |
| Runtime skin switching | Yes |
| Built-in `classic`, `material`, `dark`, and `custom` skins | Yes |
| Direct browser download | Yes |

## Table of Contents

1. [Installation](#installation)
2. [Direct Download](#direct-download)
3. [Browser Usage](#browser-usage)
4. [Settings](#settings)
5. [Events](#events)
6. [API](#api)
7. [Skins](#skins)
8. [Custom Skins](#custom-skins)
9. [Templates](#templates)
10. [License](#license)

## Installation

```bash
npm install @stackline/multiselect
```

Pin the current production release when you need a reproducible install:

```bash
npm install @stackline/multiselect@1.0.2 --save-exact
```

## Direct Download

Use the direct download when your project does not use npm:

```text
https://github.com/alexandroit/stackline-multiselect/releases/download/v1.0.2/stackline-multiselect-1.0.2.zip
```

Extract the archive and copy these files into your public assets:

```text
stackline-multiselect.css
stackline-multiselect.js
```

## Browser Usage

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
      skin: "material",
      showClearAll: true
    }
  });
</script>
```

When installing with npm, reference the package files from `node_modules` or copy them into your app assets:

```html
<link rel="stylesheet" href="./node_modules/@stackline/multiselect/src/stackline-multiselect.css">
<script src="./node_modules/@stackline/multiselect/src/stackline-multiselect.js"></script>
```

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

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `idKey` | string | `"id"` | Field used to compare items. |
| `labelKey` | string | `"itemName"` | Field rendered as the default item label. |
| `singleSelection` | boolean | `false` | Allows only one selected item. |
| `text` | string | `"Select"` | Placeholder text when nothing is selected. |
| `enableCheckAll` | boolean | `true` | Shows the select all / clear all row. |
| `enableSearchFilter` | boolean | `true` | Shows the search input. |
| `badgeShowLimit` | number | `4` | Number of selected chips shown before the counter. |
| `showClearAll` | boolean | `true` | Shows the global clear selected button. |
| `maxHeight` | number | `260` | Maximum list height in pixels. |
| `showCheckbox` | boolean | `true` | Shows checkbox controls beside options. |
| `groupBy` | string | `""` | Groups items by the provided object field. |
| `limitSelection` | number | `0` | Maximum selected items. `0` means no limit. |
| `lazyLoading` | boolean | `false` | Locally renders the first chunk of a large filtered list. |
| `theme` / `skin` | string | `"classic"` | Skin name used for styling. |

## Events

```js
var dropdown = new StacklineMultiSelect("#countries", {
  data: countries,
  selected: [],
  settings: { theme: "material", skin: "material" },
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

| Method | Description |
| :--- | :--- |
| `setData(items)` | Replaces the option list. |
| `setSelected(items)` | Replaces the selected items. |
| `setSettings(settings)` | Merges new settings and re-renders. |
| `setTheme(name)` | Updates `settings.theme` and `settings.skin`. |
| `getSelected()` | Returns a copy of the selected items. |
| `destroy()` | Removes the component from its host. |

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

You can also update only the settings object:

```js
dropdown.setSettings({
  theme: "material",
  skin: "material"
});
```

## Custom Skins

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
  --stackline-ms-surface-muted: #ede9fe;
  --stackline-ms-outline: #c4b5fd;
  --stackline-ms-outline-strong: #7c3aed;
  --stackline-ms-on-surface: #22183f;
  --stackline-ms-on-surface-muted: #6b5d80;
  --stackline-ms-chip-bg: #ede9fe;
  --stackline-ms-chip-text: #5b21b6;
  --stackline-ms-chip-remove: #5b21b6;
  --stackline-ms-divider: rgba(124, 58, 237, 0.16);
  --stackline-ms-section-bg: #faf5ff;
}
```

## Templates

```js
new StacklineMultiSelect("#colors", {
  data: colors,
  selected: [],
  settings: { theme: "material", skin: "material" },
  badgeTemplate: function (item) {
    return '<span class="chip">' + item.itemName + '</span>';
  },
  itemTemplate: function (item) {
    return '<strong>' + item.itemName + '</strong><small>' + item.detail + '</small>';
  }
});
```

## License

MIT
