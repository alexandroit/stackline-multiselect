# Stackline Multiselect Direct Download

This folder contains the direct browser files for `@stackline/multiselect@1.0.3`.

Documentation and live demo:

```text
https://alexandro.net/docs/multiselect/
```

## Files

- `stackline-multiselect.css`
- `stackline-multiselect.js`
- `direct-example.html`

## Usage

Copy `stackline-multiselect.css` and `stackline-multiselect.js` into your project, then include them in your page:

```html
<link rel="stylesheet" href="./stackline-multiselect.css">
<div id="countries"></div>
<script src="./stackline-multiselect.js"></script>
<script>
  var dropdown = new StacklineMultiSelect("#countries", {
    data: [
      { id: 1, itemName: "Brazil" },
      { id: 2, itemName: "Canada" }
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

## Themes

Use `dropdown.setTheme("classic")`, `dropdown.setTheme("material")`, `dropdown.setTheme("dark")`, or `dropdown.setTheme("custom")`.

## Clear All Button

The field shows a global `x` button when items are selected. Set `showClearAll: false` to hide it.

For a named custom skin, use any name:

```js
dropdown.setTheme("brand");
```

Then define CSS variables on `.stackline-dropdown.theme-brand`.
