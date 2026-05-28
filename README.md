# @stackline/multiselect

> A maintained vanilla JavaScript multiselect dropdown for framework-agnostic UI workflows, with search, grouping, selection limits, item and badge templates, direct browser usage, body-overlay positioning, switchable Stackline skins, and ADA-compliant keyboard/ARIA behavior.

[![npm version](https://img.shields.io/npm/v/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![npm downloads](https://img.shields.io/npm/dt/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![npm monthly](https://img.shields.io/npm/dm/@stackline/multiselect.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/multiselect)
[![license](https://img.shields.io/npm/l/@stackline/multiselect.svg?style=flat-square)](https://github.com/alexandroit/stackline-multiselect/blob/main/LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/stackline-multiselect.svg?style=flat-square)](https://github.com/alexandroit/stackline-multiselect/stargazers)

**[Documentation & Live Demos](https://alexandro.net/docs/multiselect/)** | **[Direct Download](https://github.com/alexandroit/stackline-multiselect/releases/download/v1.0.5/stackline-multiselect-1.0.5.zip)** | **[npm](https://www.npmjs.com/package/@stackline/multiselect)** | **[Issues](https://github.com/alexandroit/stackline-multiselect/issues)** | **[Repository](https://github.com/alexandroit/stackline-multiselect)**

**Latest npm release:** `1.0.5` for vanilla JavaScript projects

---

> **Credits:** Current maintenance, vanilla package stewardship, publishing, and documentation by [Alexandro Paixao Marques](https://github.com/alexandroit/stackline-multiselect).

---

## Why this library?

`@stackline/multiselect` is for projects that need a reliable multiselect without a framework dependency. It works with plain HTML, server-rendered pages, static sites, CMS templates, and framework apps that prefer to mount a small browser widget directly.

The package ships a single JavaScript file, a single CSS file, built-in skins, and a direct download bundle for projects that do not use npm.

## Features

| Feature | Supported |
| :--- | :---: |
| Framework-agnostic vanilla JavaScript | Yes |
| Multiple and single selection modes | Yes |
| Search and filter | Yes |
| Select all and clear all actions | Yes |
| Global clear selected button | Yes |
| Per-item remove buttons | Yes |
| Checkbox and no-checkbox modes | Yes |
| Selection limit | Yes |
| Badge overflow counter | Yes |
| Group by field | Yes |
| Disabled and empty states | Yes |
| Long list scroll | Yes |
| Local lazy rendering | Yes |
| Custom item templates | Yes |
| Custom badge templates | Yes |
| Runtime skin switching | Yes |
| Built-in `classic`, `material`, `dark`, `custom`, and `brand` skins | Yes |
| Named custom skins through CSS variables | Yes |
| ADA-compliant keyboard and ARIA behavior | Yes |
| Dialog/overflow clipping escape with `appendToBody` / `tagToBody` | Yes |
| Direct browser download | Yes |

## Table of Contents

1. [Vanilla Version Note](#vanilla-version-note)
2. [Installation](#installation)
3. [Option 1: npm Usage](#option-1-npm-usage)
4. [Option 2: Direct Download](#option-2-direct-download)
5. [Official Vanilla Test Matrix](#official-vanilla-test-matrix)
6. [Settings](#settings)
7. [Skins and Themes](#skins-and-themes)
8. [Custom Skins](#custom-skins)
9. [Custom Templates](#custom-templates)
10. [Events](#events)
11. [API](#api)
12. [Run Locally](#run-locally)
13. [License](#license)

## Vanilla Version Note

- package: `@stackline/multiselect`
- runtime: plain browser JavaScript
- global constructor: `StacklineMultiSelect`
- dependencies: none
- current published line: `1.0.x`

This vanilla package is separate from the Angular package. Use `@stackline/multiselect` when you need direct browser usage without Angular, React, Vue, or a bundler.

## Installation

```bash
npm install @stackline/multiselect
```

Install the current tested vanilla release exactly:

```bash
npm install @stackline/multiselect@1.0.5 --save-exact
```

## Option 1: npm Usage

Use this option first when the project installs packages with npm.

### 1. Load the CSS from `node_modules`

```html
<link rel="stylesheet" href="./node_modules/@stackline/multiselect/src/stackline-multiselect.css">
```

If your framework or bundler copies assets into a public folder, keep the same file and adjust only the path.

### 2. Add a mount element

```html
<div id="countries"></div>
```

### 3. Load the JavaScript from `node_modules`

```html
<script src="./node_modules/@stackline/multiselect/src/stackline-multiselect.js"></script>
```

### 4. Create the dropdown

```html
<link rel="stylesheet" href="./node_modules/@stackline/multiselect/src/stackline-multiselect.css">

<div id="countries"></div>

<script src="./node_modules/@stackline/multiselect/src/stackline-multiselect.js"></script>
<script>
  var dropdown = new StacklineMultiSelect("#countries", {
    data: [
      { id: 1, itemName: "Brazil" },
      { id: 2, itemName: "Canada" },
      { id: 3, itemName: "Portugal" },
      { id: 4, itemName: "United States" }
    ],
    selected: [{ id: 2, itemName: "Canada" }],
    settings: {
      singleSelection: false,
      text: "Select countries",
      selectAllText: "Select all",
      unSelectAllText: "Clear all",
      enableSearchFilter: true,
      searchPlaceholderText: "Search",
      badgeShowLimit: 4,
      maxHeight: 260,
      showCheckbox: true,
      showClearAll: true,
      noDataLabel: "No data",
      theme: "classic",
      skin: "classic"
    }
  });
</script>
```

## Option 2: Direct Download

Use the direct download when your project does not use npm:

```text
https://github.com/alexandroit/stackline-multiselect/releases/download/v1.0.5/stackline-multiselect-1.0.5.zip
```

Extract the archive and copy these files into your public assets:

```text
stackline-multiselect.css
stackline-multiselect.js
direct-example.html
```

Then reference the copied files:

```html
<link rel="stylesheet" href="./stackline-multiselect.css">

<div id="countries"></div>

<script src="./stackline-multiselect.js"></script>
<script>
  var dropdown = new StacklineMultiSelect("#countries", {
    data: [
      { id: 1, itemName: "Brazil" },
      { id: 2, itemName: "Canada" },
      { id: 3, itemName: "Portugal" },
      { id: 4, itemName: "United States" }
    ],
    selected: [{ id: 2, itemName: "Canada" }],
    settings: {
      singleSelection: false,
      text: "Select countries",
      selectAllText: "Select all",
      unSelectAllText: "Clear all",
      enableSearchFilter: true,
      searchPlaceholderText: "Search",
      badgeShowLimit: 4,
      maxHeight: 260,
      showCheckbox: true,
      showClearAll: true,
      noDataLabel: "No data",
      theme: "classic",
      skin: "classic"
    }
  });
</script>
```

## Official Vanilla Test Matrix

The public documentation uses the same examples from the vanilla test application. Switch between skins through the settings object:

```js
settings: {
  text: "Classic basic",
  theme: "classic",
  skin: "classic"
}
```

```js
settings: {
  text: "Material basic",
  theme: "material",
  skin: "material"
}
```

The same scenarios are validated for `classic`, `material`, `dark`, and `custom` skins:

| # | Scenario | Main settings tested |
| :---: | :--- | :--- |
| 01 | Basic multi | `{ enableSearchFilter: false }` |
| 02 | Search + select all | Search, select all, clear all, events |
| 03 | Single without checkbox | `{ singleSelection: true, showCheckbox: false, enableCheckAll: false }` |
| 04 | Multi without checkbox | `{ showCheckbox: false, enableCheckAll: false }` |
| 05 | Selection limit | `{ limitSelection: 2, badgeShowLimit: 2 }` |
| 06 | Badge overflow | `{ badgeShowLimit: 2, maxHeight: 220 }` |
| 07 | Grouped by region | `{ groupBy: "region", maxHeight: 220 }` |
| 08 | Disabled with value | `{ disabled: true }` |
| 09 | Empty data | `{ noDataLabel: "No records found" }` |
| 10 | Long list with scroll | `{ maxHeight: 120, badgeShowLimit: 3 }` |
| 11 | Local lazy loading | `{ lazyLoading: true, maxHeight: 120, badgeShowLimit: 3 }` |
| 12 | Item + chip template | `badgeTemplate` and `itemTemplate` |

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
  lazyLoading: false,
  lazyPageSize: 40,
  appendToBody: false,
  tagToBody: false,
  autoPosition: true,
  position: "bottom",
  closeDropDownOnSelection: false,
  ariaLabel: "Multiselect dropdown",
  listboxAriaLabel: "Dropdown options"
}
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `idKey` | string | `"id"` | Field used to compare items. |
| `labelKey` | string | `"itemName"` | Field rendered as the default item label. |
| `singleSelection` | boolean | `false` | Allows only one selected item. |
| `text` | string | `"Select"` | Placeholder text when nothing is selected. |
| `selectAllText` | string | `"Select all"` | Text for the select all action. |
| `unSelectAllText` | string | `"Clear all"` | Text for the clear all action. |
| `clearAllText` | string | `"Clear selected items"` | Accessible label for the global clear button. |
| `enableCheckAll` | boolean | `true` | Shows the select all / clear all row. |
| `enableSearchFilter` | boolean | `true` | Shows the search input. |
| `searchPlaceholderText` | string | `"Search"` | Placeholder for the search input. |
| `badgeShowLimit` | number | `4` | Number of selected chips shown before the counter. |
| `showClearAll` | boolean | `true` | Shows the global clear selected button. |
| `maxHeight` | number | `260` | Maximum list height in pixels. |
| `showCheckbox` | boolean | `true` | Shows checkbox controls beside options. |
| `noDataLabel` | string | `"No data"` | Empty-state label. |
| `theme` / `skin` | string | `"classic"` | Skin name used for styling. |
| `disabled` | boolean | `false` | Disables the control. |
| `groupBy` | string | `""` | Groups items by the provided object field. |
| `limitSelection` | number | `0` | Maximum selected items. `0` means no limit. |
| `lazyLoading` | boolean | `false` | Locally renders the first chunk of a large filtered list. |
| `lazyPageSize` | number | `40` | Number of rows added per lazy chunk. |
| `appendToBody` / `tagToBody` | boolean | `false` | Moves the open panel to `document.body` to avoid overflow/dialog clipping. |
| `autoPosition` | boolean | `true` | Chooses top or bottom when space is constrained. |
| `position` | string | `"bottom"` | Preferred open direction when `autoPosition` does not override it. |
| `closeDropDownOnSelection` | boolean | `false` | Closes after selecting an item. |
| `ariaLabel` | string | `"Multiselect dropdown"` | Accessible name for the combobox trigger. |
| `listboxAriaLabel` | string | `"Dropdown options"` | Accessible name for the option list. |

## Skins and Themes

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

The component adds `theme-{name}` to the internal `.stackline-dropdown` root.

## Custom Skins

Use `custom` when you want the variable-driven layout without naming a new skin:

```js
dropdown.setTheme("custom");
```

Use any other name when your app needs a named brand skin. Names outside the built-in skins automatically receive both `theme-{name}` and `theme-custom`.

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

## Custom Templates

```js
new StacklineMultiSelect("#colors", {
  data: colors,
  selected: [],
  settings: {
    text: "Select colors",
    theme: "material",
    skin: "material"
  },
  badgeTemplate: function (item) {
    return '<span class="chip">' + item.itemName + '</span>';
  },
  itemTemplate: function (item) {
    return '<strong>' + item.itemName + '</strong><small>' + item.detail + '</small>';
  }
});
```

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

| Event | Payload |
| :--- | :--- |
| `onSelect` | Selected item |
| `onDeSelect` | Removed item |
| `onSelectAll` | Selected items |
| `onDeSelectAll` | Removed or cleared items |
| `onChange` | Current selected items |
| `onOpen` | Current selected items |
| `onClose` | Current selected items |
| `onScrollToEnd` | Lazy loading progress object |

## API

```js
dropdown.setData(items);
dropdown.setSelected(items);
dropdown.setSettings({ badgeShowLimit: 2 });
dropdown.setTheme("dark");
dropdown.getSelected();
dropdown.openDropdown();
dropdown.closeDropdown();
dropdown.focusSearch();
dropdown.selectAll();
dropdown.clearSelection();
dropdown.destroy();
```

| Method | Description |
| :--- | :--- |
| `setData(items)` | Replaces the option list. |
| `setSelected(items)` | Replaces the selected items. |
| `setSettings(settings)` | Merges new settings and re-renders. |
| `setTheme(name)` | Updates `settings.theme` and `settings.skin`. |
| `getSelected()` | Returns a copy of the selected items. |
| `openDropdown()` | Opens the menu. |
| `closeDropdown()` | Closes the menu. |
| `focusSearch()` | Opens the menu and focuses the search input. |
| `selectAll()` | Toggles select all for the current filtered list. |
| `clearSelection()` | Clears every selected item. |
| `destroy()` | Removes the component from its host. |

## Run Locally

Clone the repository and open the demo page:

```bash
git clone https://github.com/alexandroit/stackline-multiselect.git
cd stackline-multiselect
python3 -m http.server 4317
```

Then open:

```text
http://127.0.0.1:4317/
```

## License

MIT
