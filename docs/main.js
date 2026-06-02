(function () {
  "use strict";

  var VERSION = "1.1.0";
  var STACKBLITZ_BASE = "https://stackblitz.com/github/alexandroit/stackline-multiselect";
  var routeList = [
    ["basic", "Basic usage"],
    ["keyboard-contract", "Keyboard contract"],
    ["aria-state", "ARIA state audit"],
    ["headless-aria", "Headless + ARIA"],
    ["state-hook", "State hook"],
    ["slots-api", "Slots API"],
    ["type-safe-factory", "Type-safe factory"],
    ["async-object-preservation", "Async object preservation"],
    ["single-selection", "Single selection"],
    ["search-filter", "Search filter"],
    ["custom-search-api", "Custom search from API"],
    ["search-filter-by-property", "Search filter by property"],
    ["search-add-new-item", "Search and Add New Item"],
    ["group-by", "Group By"],
    ["templating", "Templating"],
    ["template-driven-forms", "Template-style forms"],
    ["reactive-forms", "Reactive forms"],
    ["virtual-scrolling", "Virtual Scrolling"],
    ["lazy-loading-api", "Lazy Loading from API"],
    ["remote-data", "Data from remote API"],
    ["list-loop", "Using in list for loop"],
    ["dialog", "Using inside dialog"],
    ["multiple-dropdowns", "Multiple dropdowns"],
    ["dynamic-data", "Load dynamic data"],
    ["methods", "Methods"],
    ["events", "Events"],
    ["disabled", "Disabled state"],
    ["limit-selection", "Limit selection"],
    ["limit-badges", "Limit badges"],
    ["all-visible-counter", "All visible counter"],
    ["custom-placeholder", "Custom placeholder"],
    ["styling", "Styling"],
    ["body-overlay-auto", "Body Overlay Auto"]
  ].map(function (entry) {
    return { slug: entry[0], title: entry[1] };
  });

  var countrySeeds = [
    ["Brazil", "BR", "Brasilia", "South America", "Americas"],
    ["Canada", "CA", "Ottawa", "North America", "Americas"],
    ["Portugal", "PT", "Lisbon", "Southern Europe", "Europe"],
    ["Argentina", "AR", "Buenos Aires", "South America", "Americas"],
    ["Germany", "DE", "Berlin", "Western Europe", "Europe"],
    ["Mexico", "MX", "Mexico City", "North America", "Americas"],
    ["Colombia", "CO", "Bogota", "South America", "Americas"],
    ["Uruguay", "UY", "Montevideo", "South America", "Americas"],
    ["Costa Rica", "CR", "San Jose", "Central America", "Americas"],
    ["Chile", "CL", "Santiago", "South America", "Americas"],
    ["Peru", "PE", "Lima", "South America", "Americas"],
    ["Ecuador", "EC", "Quito", "South America", "Americas"],
    ["Panama", "PA", "Panama City", "Central America", "Americas"],
    ["Dominican Republic", "DO", "Santo Domingo", "Caribbean", "Americas"],
    ["Jamaica", "JM", "Kingston", "Caribbean", "Americas"],
    ["Bahamas", "BS", "Nassau", "Caribbean", "Americas"],
    ["Barbados", "BB", "Bridgetown", "Caribbean", "Americas"],
    ["Belize", "BZ", "Belmopan", "Central America", "Americas"],
    ["Paraguay", "PY", "Asuncion", "South America", "Americas"],
    ["Ireland", "IE", "Dublin", "Northern Europe", "Europe"],
    ["Spain", "ES", "Madrid", "Southern Europe", "Europe"],
    ["France", "FR", "Paris", "Western Europe", "Europe"],
    ["Italy", "IT", "Rome", "Southern Europe", "Europe"],
    ["Netherlands", "NL", "Amsterdam", "Western Europe", "Europe"],
    ["Belgium", "BE", "Brussels", "Western Europe", "Europe"],
    ["Switzerland", "CH", "Bern", "Western Europe", "Europe"],
    ["Austria", "AT", "Vienna", "Western Europe", "Europe"],
    ["Sweden", "SE", "Stockholm", "Northern Europe", "Europe"],
    ["Norway", "NO", "Oslo", "Northern Europe", "Europe"],
    ["Denmark", "DK", "Copenhagen", "Northern Europe", "Europe"],
    ["Finland", "FI", "Helsinki", "Northern Europe", "Europe"],
    ["Iceland", "IS", "Reykjavik", "Northern Europe", "Europe"],
    ["Czech Republic", "CZ", "Prague", "Central Europe", "Europe"],
    ["Slovakia", "SK", "Bratislava", "Central Europe", "Europe"],
    ["Slovenia", "SI", "Ljubljana", "Southern Europe", "Europe"],
    ["Croatia", "HR", "Zagreb", "Southern Europe", "Europe"],
    ["Greece", "GR", "Athens", "Southern Europe", "Europe"],
    ["Malta", "MT", "Valletta", "Southern Europe", "Europe"],
    ["Luxembourg", "LU", "Luxembourg", "Western Europe", "Europe"],
    ["Estonia", "EE", "Tallinn", "Northern Europe", "Europe"],
    ["South Africa", "ZA", "Pretoria", "Southern Africa", "Africa"],
    ["Kenya", "KE", "Nairobi", "East Africa", "Africa"],
    ["Ghana", "GH", "Accra", "West Africa", "Africa"],
    ["Botswana", "BW", "Gaborone", "Southern Africa", "Africa"],
    ["Namibia", "NA", "Windhoek", "Southern Africa", "Africa"],
    ["Rwanda", "RW", "Kigali", "East Africa", "Africa"],
    ["Tanzania", "TZ", "Dodoma", "East Africa", "Africa"],
    ["Senegal", "SN", "Dakar", "West Africa", "Africa"],
    ["Mauritius", "MU", "Port Louis", "East Africa", "Africa"],
    ["Seychelles", "SC", "Victoria", "East Africa", "Africa"],
    ["Cabo Verde", "CV", "Praia", "West Africa", "Africa"],
    ["Japan", "JP", "Tokyo", "East Asia", "Asia"],
    ["Singapore", "SG", "Singapore", "Southeast Asia", "Asia"],
    ["Malaysia", "MY", "Kuala Lumpur", "Southeast Asia", "Asia"],
    ["Thailand", "TH", "Bangkok", "Southeast Asia", "Asia"],
    ["Indonesia", "ID", "Jakarta", "Southeast Asia", "Asia"],
    ["Philippines", "PH", "Manila", "Southeast Asia", "Asia"],
    ["Nepal", "NP", "Kathmandu", "South Asia", "Asia"],
    ["Bhutan", "BT", "Thimphu", "South Asia", "Asia"],
    ["Sri Lanka", "LK", "Sri Jayawardenepura Kotte", "South Asia", "Asia"],
    ["Australia", "AU", "Canberra", "Oceania", "Oceania"],
    ["New Zealand", "NZ", "Wellington", "Oceania", "Oceania"],
    ["Fiji", "FJ", "Suva", "Oceania", "Oceania"],
    ["Samoa", "WS", "Apia", "Oceania", "Oceania"]
  ];

  var countries = countrySeeds.map(function (seed, index) {
    return {
      id: index + 1,
      itemName: seed[0],
      name: seed[1],
      flag: seed[1],
      capital: seed[2],
      region: seed[3],
      category: seed[4],
      disabled: seed[0] === "Costa Rica"
    };
  });
  var templateItems = [
    { id: 201, itemName: "Primary", detail: "Main interface color", color: "#3f51b5" },
    { id: 202, itemName: "Success", detail: "Positive feedback", color: "#2e7d32" },
    { id: 203, itemName: "Warning", detail: "Attention state", color: "#ed6c02" },
    { id: 204, itemName: "Danger", detail: "Destructive state", color: "#d32f2f" },
    { id: 205, itemName: "Neutral", detail: "Text and surface", color: "#475569" }
  ];
  var instances = [];

  function byIds(data, ids) {
    return data.filter(function (item) {
      return ids.indexOf(item.id) !== -1;
    });
  }

  function compact(items) {
    return items.map(function (item) {
      return { id: item.id, itemName: item.itemName };
    });
  }

  function makeSettings(skin, text, options) {
    var settings = {
      singleSelection: false,
      text: text,
      selectAllText: "Select all",
      unSelectAllText: "Clear all",
      enableCheckAll: true,
      enableSearchFilter: true,
      searchPlaceholderText: "Search",
      badgeShowLimit: 3,
      maxHeight: 220,
      showCheckbox: true,
      noDataLabel: "No data",
      clearAll: true,
      primaryKey: "id",
      labelKey: "itemName",
      searchBy: ["itemName", "capital", "region"],
      skin: skin || "classic"
    };
    options = options || {};
    Object.keys(options).forEach(function (key) {
      settings[key] = options[key];
    });
    return settings;
  }

  function routeMeta(slug) {
    var copy = {
      "basic": ["Basic", "Basic usage", "Classic multi-select with chips, clear all, and selected counters."],
      "keyboard-contract": ["Keyboard contract", "Keyboard feature switches", "Turn individual keyboard behaviors on or off and compare how Space behaves on focused options."],
      "aria-state": ["ARIA state", "ARIA selected and checked audit", "Inspect the generated option attributes used by screen readers in multiselect mode."],
      "headless-aria": ["Headless HTML", "100% custom HTML with ARIA getters", "Use Stackline state, filtering, grouping, keyboard handling, ARIA ids, and callbacks while owning every element and class."],
      "state-hook": ["State engine", "createMultiSelectState", "Use the framework-free state engine without the styled DOM."],
      "slots-api": ["Render callbacks", "Custom HTML callbacks", "Customize badges, options, empty states, and menu footer while keeping the built-in behavior."],
      "type-safe-factory": ["Factory", "Factory-style setup", "Create reusable settings/data helpers around plain JavaScript object contracts."],
      "async-object-preservation": ["Async", "Async object preservation", "Selected objects remain stable when a late or paged async response replaces the available options."],
      "single-selection": ["Selection", "Single selection", "Single-value mode with the same object data and keyboard behavior."],
      "search-filter": ["Search", "Search filter", "Filter by label while preserving selected objects."],
      "custom-search-api": ["Async search", "Custom search from API", "Model request-driven searches without stale responses replacing newer user intent."],
      "search-filter-by-property": ["Search", "Search filter by property", "Search by item name, capital, and region using searchBy."],
      "search-add-new-item": ["Create", "Search and Add New Item", "Show how user-created values can be appended to the option list."],
      "group-by": ["Groups", "Group By", "Group object data by category without breaking keyboard navigation."],
      "templating": ["Templates", "Templating", "Render item and badge HTML with vanilla callbacks."],
      "template-driven-forms": ["Forms", "Template-style forms", "Keep selection state next to ordinary HTML form controls."],
      "reactive-forms": ["Forms", "Reactive forms", "Drive the selected values from JavaScript state and validate from the array."],
      "virtual-scrolling": ["Long list", "Virtual Scrolling", "Render a large option set with a constrained scroll area."],
      "lazy-loading-api": ["Lazy", "Lazy Loading from API", "Append more rows as the list is navigated or scrolled."],
      "remote-data": ["Remote", "Data from remote API", "Set option data after an async load while keeping selected values."],
      "list-loop": ["Repeated", "Using in list for loop", "Render multiple independent dropdowns from the same configuration pattern."],
      "dialog": ["Dialog", "Using inside dialog", "Validate appendToBody inside overflow-hidden dialog surfaces."],
      "multiple-dropdowns": ["Multiple", "Multiple dropdowns", "Run independent instances side by side without shared state."],
      "dynamic-data": ["Dynamic", "Load dynamic data", "Swap option arrays at runtime through setData."],
      "methods": ["Methods", "Methods", "Call open, close, clear, select all, and set selected imperatively."],
      "events": ["Events", "Events", "Listen to callbacks and stackline:* DOM events."],
      "disabled": ["Disabled", "Disabled state", "Keep selected values visible while blocking interaction."],
      "limit-selection": ["Limits", "Limit selection", "Cap selected values and keep disabled options visible."],
      "limit-badges": ["Badges", "Limit badges", "Keep the +N counter outside the chip flow."],
      "all-visible-counter": ["Counter", "All visible counter", "Selected badges stay visible and the overflow counter disappears when no selected items are hidden."],
      "custom-placeholder": ["Placeholder", "Custom placeholder", "Left-aligned placeholder text stays vertically centered."],
      "styling": ["Styling", "Styling", "Use skins and CSS variables for visual adaptation."],
      "body-overlay-auto": ["Overlay", "Body Overlay Auto", "Auto-position a body-appended panel above or below the trigger."]
    };
    var data = copy[slug] || copy.basic;
    return { eyebrow: data[0], title: data[1], description: data[2] };
  }

  function currentSlug() {
    var hash = window.location.hash.replace(/^#\/?/, "");
    if (hash) {
      return hash;
    }
    return window.location.pathname.replace(/^\/+|\/+$/g, "") || "basic";
  }

  function labelFor(value) {
    if (Array.isArray(value)) {
      return value.length + " items";
    }
    if (value && value.itemName) {
      return value.itemName;
    }
    return String(value == null ? "" : value);
  }

  function sourceFor(slug, config) {
    var selected = compact(config.selected || []);
    var settings = config.settings || {};
    return {
      html: '<div id="' + slug + '-dropdown"></div>\n<script>\n  new StacklineMultiSelect("#' + slug + '-dropdown", options);\n</script>',
      js: "const data = countries;\nconst selected = " + JSON.stringify(selected, null, 2) + ";\nconst settings = " + JSON.stringify(settings, null, 2) + ";\n\nnew StacklineMultiSelect(target, {\n  data,\n  selected,\n  settings,\n  onChange: console.log\n});",
      json: JSON.stringify({
        data: (config.data || countries).length + " items",
        selected: selected,
        settings: settings
      }, null, 2)
    };
  }

  function element(name, className, text) {
    var node = document.createElement(name);
    if (className) {
      node.className = className;
    }
    if (text != null) {
      node.textContent = text;
    }
    return node;
  }

  function codeGrid(sources) {
    var grid = element("div", "code-grid");
    [["HTML", sources.html], ["JS", sources.js], ["JSON", sources.json]].forEach(function (source) {
      var card = element("section", "code-card");
      card.appendChild(element("strong", "", source[0]));
      var pre = document.createElement("pre");
      pre.textContent = source[1];
      card.appendChild(pre);
      grid.appendChild(card);
    });
    return grid;
  }

  function makeLayout(container, slug, meta, sources, initialEvent) {
    var events = [initialEvent || "ready"];
    var section = element("section", "skin-section");
    var heading = element("div", "section-heading");
    heading.appendChild(element("p", "eyebrow", meta.eyebrow));
    heading.appendChild(element("h2", "", meta.title));
    heading.appendChild(element("p", "example-copy", meta.description));
    var link = element("a", "stackblitz-row-link", "Open this route in StackBlitz");
    link.href = STACKBLITZ_BASE + "?file=" + encodeURIComponent("docs/main.js") + "&startScript=start&initialpath=" + encodeURIComponent("/" + slug);
    link.target = "_blank";
    link.rel = "noopener";
    heading.appendChild(link);
    section.appendChild(heading);

    var row = element("article", "example-row");
    var demo = element("div", "demo-cell");
    var code = element("div", "code-cell");
    code.appendChild(codeGrid(sources));
    row.appendChild(demo);
    row.appendChild(code);
    section.appendChild(row);
    container.appendChild(section);

    var activity = element("section", "activity");
    activity.appendChild(element("h2", "", "Event log"));
    var log = element("div");
    activity.appendChild(log);
    container.appendChild(activity);

    function renderEvents() {
      log.innerHTML = "";
      events.forEach(function (event) {
        log.appendChild(element("p", "", event));
      });
    }

    function record(type, value) {
      events.unshift(type + ": " + labelFor(value));
      events = events.slice(0, 10);
      renderEvents();
    }

    renderEvents();
    return { demo: demo, record: record, activity: activity };
  }

  function createDropdown(mount, config, record, name) {
    var instance = new StacklineMultiSelect(mount, {
      data: config.data,
      selected: config.selected,
      settings: config.settings,
      itemTemplate: config.itemTemplate,
      badgeTemplate: config.badgeTemplate,
      emptyTemplate: config.emptyTemplate,
      footerTemplate: config.footerTemplate,
      onSelect: function (item) { record(name + " select", item); },
      onDeSelect: function (item) { record(name + " deselect", item); },
      onSelectAll: function (items) { record(name + " selectAll", items); },
      onDeSelectAll: function (items) { record(name + " clearAll", items); },
      onChange: function (items) { record(name + " change", items); },
      onScrollToEnd: function (payload) { record(name + " scrollToEnd", payload.rendered + "/" + payload.total); }
    });
    instances.push(instance);
    return instance;
  }

  function flag(item) {
    var span = element("span", "country-flag", item.flag || "");
    span.setAttribute("aria-hidden", "true");
    return span.outerHTML;
  }

  function optionTemplate(item) {
    return '<span class="option-row">' + flag(item) + '<span><strong>' + item.itemName + '</strong><small>' + item.capital + " · " + item.region + "</small></span></span>";
  }

  function badgeTemplate(item) {
    return '<span class="swatch-chip">' + flag(item) + item.itemName + "</span>";
  }

  function colorOptionTemplate(item) {
    return '<span class="option-row"><span class="swatch" style="background:' + item.color + '"></span><span><strong>' + item.itemName + '</strong><small>' + item.detail + "</small></span></span>";
  }

  function colorBadgeTemplate(item) {
    return '<span class="swatch-chip"><span class="swatch" style="background:' + item.color + '"></span>' + item.itemName + "</span>";
  }

  function configFor(slug) {
    var base = { data: countries, selected: countries.slice(0, 3), settings: makeSettings("classic", "Basic multi", { enableSearchFilter: false }) };
    var configs = {
      "single-selection": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "Single country", { singleSelection: true, enableCheckAll: false }) },
      "search-filter": { data: countries, selected: [countries[3]], settings: makeSettings("classic", "Search countries", { enableSearchFilter: true }) },
      "custom-search-api": { data: countries.slice(0, 20), selected: [countries[1]], settings: makeSettings("classic", "Search remote countries", { enableSearchFilter: true, loadingText: "Searching..." }) },
      "search-filter-by-property": { data: countries, selected: [countries[4]], settings: makeSettings("classic", "Search by properties", { enableSearchFilter: true, searchBy: ["itemName", "capital", "region", "category"] }) },
      "search-add-new-item": { data: countries.slice(0, 10), selected: [countries[0]], settings: makeSettings("classic", "Add searchable value", { enableSearchFilter: true }), footerTemplate: function () { return "Use callbacks to append user-created objects."; } },
      "group-by": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "Grouped countries", { groupBy: "category", maxHeight: 260 }) },
      "templating": { data: templateItems, selected: [templateItems[0], templateItems[2]], settings: makeSettings("classic", "Templated status", { badgeShowLimit: 3 }), itemTemplate: colorOptionTemplate, badgeTemplate: colorBadgeTemplate },
      "template-driven-forms": { data: countries, selected: [countries[2]], settings: makeSettings("classic", "Form skills", { enableSearchFilter: true }) },
      "reactive-forms": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("classic", "Reactive field", { enableSearchFilter: true }) },
      "virtual-scrolling": { data: countries.concat(countries.map(function (item, index) { return Object.assign({}, item, { id: 500 + index, itemName: item.itemName + " Office" }); })), selected: [countries[5]], settings: makeSettings("classic", "Long country list", { maxHeight: 150 }) },
      "lazy-loading-api": { data: countries, selected: [countries[6]], settings: makeSettings("classic", "Lazy countries", { lazyLoading: true, lazyPageSize: 16, maxHeight: 150 }) },
      "remote-data": { data: countries.slice(0, 16), selected: [countries[1]], settings: makeSettings("classic", "Remote countries", { enableSearchFilter: true }) },
      "list-loop": { data: countries.slice(0, 12), selected: [countries[0]], settings: makeSettings("classic", "Loop item", { enableSearchFilter: false }) },
      "dialog": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("material", "Dialog dropdown", { appendToBody: true, tagToBody: true, groupBy: "category", maxHeight: 180, badgeShowLimit: 2 }) },
      "multiple-dropdowns": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "First dropdown", { enableSearchFilter: false }) },
      "dynamic-data": { data: countries.slice(0, 8), selected: [countries[1]], settings: makeSettings("classic", "Dynamic countries", { enableSearchFilter: true }) },
      "methods": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "Method control", { enableSearchFilter: true }) },
      "events": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "Event stream", { enableSearchFilter: true }) },
      "disabled": { data: countries, selected: [countries[4]], settings: makeSettings("classic", "Disabled dropdown", { disabled: true }) },
      "limit-selection": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("classic", "Limit two", { limitSelection: 2, badgeShowLimit: 2 }) },
      "limit-badges": { data: countries, selected: countries.slice(0, 8), settings: makeSettings("classic", "Many selected", { badgeShowLimit: 3 }) },
      "all-visible-counter": { data: countries, selected: countries.slice(0, 4), settings: makeSettings("classic", "All selected visible", { enableSearchFilter: false, badgeShowLimit: 10 }) },
      "custom-placeholder": { data: countries, selected: [], settings: makeSettings("material", "Choose deployment markets", { enableSearchFilter: false }) },
      "styling": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("brand", "Brand skin", { enableSearchFilter: false }) },
      "body-overlay-auto": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("material", "Auto overlay", { appendToBody: true, tagToBody: true, autoPosition: true, position: "bottom", groupBy: "category", maxHeight: 180, badgeShowLimit: 2 }) },
      "aria-state": { data: countries, selected: [countries[0], countries[1]], settings: makeSettings("classic", "ARIA countries", { groupBy: "category", enableSearchFilter: true }) },
      "slots-api": { data: countries.slice(0, 20), selected: [countries[0], countries[1]], settings: makeSettings("classic", "Rendered countries", { badgeShowLimit: 2 }), itemTemplate: optionTemplate, badgeTemplate: badgeTemplate },
      "type-safe-factory": { data: countries, selected: [countries[0]], settings: makeSettings("classic", "Factory countries", { enableSearchFilter: false }) },
      "async-object-preservation": { data: countries.slice(3, 14), selected: [countries[0], countries[1], countries[2]], settings: makeSettings("classic", "Async page", { enableSearchFilter: true, badgeShowLimit: 2 }) }
    };
    return configs[slug] || base;
  }

  function renderDropdownRoute(container, slug) {
    var meta = routeMeta(slug);
    var config = configFor(slug);
    var layout = makeLayout(container, slug, meta, sourceFor(slug, config), "ready");
    var stack = element("div", "dropdown-stack");
    var mount = element("div");
    stack.appendChild(mount);
    stack.appendChild(element("p", "settings-preview", "skin: " + config.settings.skin));
    layout.demo.appendChild(stack);
    createDropdown(mount, config, layout.record, slug);
  }

  function renderKeyboard(container) {
    var keyboard = {
      space: true,
      tab: true,
      arrows: true,
      escape: true,
      backspaceRemovesLastWhenSearchEmpty: false,
      deleteRemovesFocusedBadge: true
    };
    var spaceOptionAction = "toggle";
    var config = {
      data: countries,
      selected: countries.slice(0, 2),
      settings: makeSettings("classic", "Keyboard countries", {
        enableSearchFilter: true,
        keyboard: Object.assign({}, keyboard, { spaceOptionAction: spaceOptionAction })
      })
    };
    var layout = makeLayout(container, "keyboard-contract", routeMeta("keyboard-contract"), sourceFor("keyboard-contract", config), "keyboard ready");
    var shell = element("div", "keyboard-demo");
    var switches = element("div", "keyboard-switches");
    var modes = element("div", "space-mode-switches");
    var mount = element("div");
    var json = element("pre", "keyboard-json");
    shell.appendChild(switches);
    shell.appendChild(modes);
    shell.appendChild(mount);
    shell.appendChild(json);
    layout.demo.appendChild(shell);
    var instance = createDropdown(mount, config, layout.record, "keyboard");

    function update() {
      instance.setSettings({ keyboard: Object.assign({}, keyboard, { spaceOptionAction: spaceOptionAction }) });
      json.textContent = JSON.stringify({ keyboard: instance.settings.keyboard }, null, 2);
      renderButtons();
    }

    function renderButtons() {
      switches.innerHTML = "";
      [
        ["space", "Space"],
        ["tab", "Tab"],
        ["arrows", "Arrows"],
        ["escape", "Escape"],
        ["backspaceRemovesLastWhenSearchEmpty", "Empty search Backspace"],
        ["deleteRemovesFocusedBadge", "Focused badge Delete"]
      ].forEach(function (feature) {
        var button = element("button", keyboard[feature[0]] ? "active" : "", feature[1]);
        button.type = "button";
        button.addEventListener("click", function () {
          keyboard[feature[0]] = !keyboard[feature[0]];
          update();
        });
        switches.appendChild(button);
      });
      modes.innerHTML = "";
      [["toggle", "Toggle current"], ["toggle-and-next", "Toggle + next"]].forEach(function (mode) {
        var button = element("button", spaceOptionAction === mode[0] ? "active" : "", mode[1]);
        button.type = "button";
        button.addEventListener("click", function () {
          spaceOptionAction = mode[0];
          update();
        });
        modes.appendChild(button);
      });
    }

    renderButtons();
    json.textContent = JSON.stringify({ keyboard: instance.settings.keyboard }, null, 2);
  }

  function applyProps(node, props) {
    Object.keys(props || {}).forEach(function (key) {
      var value = props[key];
      if (value == null || value === false) {
        return;
      }
      if (key === "className" || key === "class") {
        node.className = value;
        return;
      }
      if (key.indexOf("on") === 0 && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
        return;
      }
      node.setAttribute(key, String(value));
    });
    return node;
  }

  function renderHeadless(container) {
    var meta = routeMeta("headless-aria");
    var sources = {
      html: '<div id="headless"></div>',
      js: "const dropdown = createStacklineMultiSelectState({ data, selected, settings });\n// Render any HTML and apply dropdown.get*Props().",
      json: JSON.stringify({ settings: makeSettings("classic", "Choose countries", { groupBy: "category", badgeShowLimit: 2 }) }, null, 2)
    };
    var layout = makeLayout(container, "headless-aria", meta, sources, "headless ready");
    var state = createStacklineMultiSelectState({
      data: countries.slice(0, 40),
      selected: countries.slice(0, 3),
      settings: makeSettings("classic", "Choose countries", {
        enableSearchFilter: true,
        searchPlaceholderText: "Search countries",
        groupBy: "category",
        badgeShowLimit: 2,
        keyboard: {
          space: true,
          spaceOptionAction: "toggle",
          tab: true,
          arrows: true,
          escape: true,
          backspaceRemovesLastWhenSearchEmpty: false,
          deleteRemovesFocusedBadge: true
        }
      }),
      onChange: function (items, type, value) {
        layout.record(type || "change", value || items);
      },
      onUpdate: render
    });

    function render() {
      layout.demo.innerHTML = "";
      var root = applyProps(element("div", "headless-shell"), state.getRootProps());
      var toolbar = element("div", "headless-toolbar");
      toolbar.appendChild(element("span", "", state.selectedItems.length + " selected"));
      toolbar.appendChild(applyProps(element("button", "", "Clear all"), state.getClearAllButtonProps()));
      root.appendChild(toolbar);

      var trigger = applyProps(element("button", "headless-trigger"), state.getTriggerProps());
      trigger.innerHTML = "<span><small>Country filter</small><strong>" + state.label + "</strong></span><b>" + (state.isOpen ? "Close" : "Open") + "</b>";
      root.appendChild(trigger);

      var chips = element("div", "headless-chips");
      state.visibleBadges.forEach(function (item) {
        var chip = element("span", "headless-chip");
        chip.appendChild(element("span", "country-flag", item.flag));
        chip.appendChild(document.createTextNode(" " + item.itemName + " "));
        chip.appendChild(applyProps(element("button", "", "x"), state.getRemoveButtonProps(item)));
        chips.appendChild(chip);
      });
      if (state.hiddenBadgeCount > 0) {
        chips.appendChild(element("span", "headless-counter", "+" + state.hiddenBadgeCount));
      }
      root.appendChild(chips);

      if (state.isOpen) {
        var panel = element("div", "headless-panel");
        var label = element("label", "headless-search-label", "Search");
        label.setAttribute("for", state.listboxId + "-search");
        panel.appendChild(label);
        panel.appendChild(applyProps(element("input", "headless-search"), state.getSearchInputProps({ id: state.listboxId + "-search" })));
        var listbox = applyProps(element("div", "headless-listbox"), state.getListboxProps());
        state.groups.forEach(function (group) {
          var section = element("section", "headless-group");
          var head = element("div", "headless-group-head");
          head.appendChild(element("span", "", group.name));
          var groupButton = element("button", "", group.selected ? "Clear group" : "Select group");
          groupButton.addEventListener("click", function () {
            state.toggleGroup(group.name, group.items.map(function (option) { return option.item; }));
          });
          head.appendChild(groupButton);
          section.appendChild(head);
          group.items.forEach(function (option) {
            var row = applyProps(element("div", option.selected ? "headless-option selected" : "headless-option"), state.getOptionProps(option));
            row.appendChild(element("span", "headless-check"));
            row.lastChild.setAttribute("data-checked", option.selected ? "true" : "false");
            row.appendChild(element("span", "country-flag", option.item.flag));
            var copy = element("span", "headless-option-copy");
            copy.appendChild(element("strong", "", option.label));
            copy.appendChild(element("small", "", option.item.capital + " · " + option.item.region));
            row.appendChild(copy);
            row.appendChild(element("code", "", "selected=" + String(option.selected)));
            section.appendChild(row);
          });
          listbox.appendChild(section);
        });
        panel.appendChild(listbox);
        root.appendChild(panel);
      }
      layout.demo.appendChild(root);
    }

    render();
  }

  function renderStateRoute(container) {
    var meta = routeMeta("state-hook");
    var config = { data: countries, selected: countries.slice(0, 2), settings: makeSettings("classic", "State countries", { groupBy: "category" }) };
    var layout = makeLayout(container, "state-hook", meta, sourceFor("state-hook", config), "state ready");
    var state = createStacklineMultiSelectState({
      data: config.data,
      selected: config.selected,
      settings: config.settings,
      onChange: function (items, type, value) { layout.record(type || "change", value || items); },
      onUpdate: render
    });

    function render() {
      layout.demo.innerHTML = "";
      var bar = element("div", "method-bar");
      [
        ["Open", function () { state.open(); }],
        ["Close", function () { state.close(); }],
        ["Select all", function () { state.selectAll(); }],
        ["Clear all", function () { state.clear(); }]
      ].forEach(function (action) {
        var button = element("button", "", action[0]);
        button.type = "button";
        button.addEventListener("click", action[1]);
        bar.appendChild(button);
      });
      layout.demo.appendChild(bar);
      layout.demo.appendChild(element("pre", "state-json", JSON.stringify({
        open: state.isOpen,
        selected: compact(state.selectedItems),
        visibleOptions: state.visibleOptions.length,
        groups: state.groups.map(function (group) { return group.name; })
      }, null, 2)));
    }

    render();
  }

  function renderMethods(container) {
    var config = configFor("methods");
    var layout = makeLayout(container, "methods", routeMeta("methods"), sourceFor("methods", config), "methods ready");
    var bar = element("div", "method-bar");
    var mount = element("div");
    layout.demo.appendChild(bar);
    layout.demo.appendChild(mount);
    var instance = createDropdown(mount, config, layout.record, "methods");
    [
      ["Open", function () { instance.open(); }],
      ["Close", function () { instance.close(true); }],
      ["Select all", function () { instance.selectAll(); }],
      ["Clear", function () { instance.clear(); }],
      ["Brazil + Canada", function () { instance.setSelected(countries.slice(0, 2)); }]
    ].forEach(function (action) {
      var button = element("button", "", action[0]);
      button.type = "button";
      button.addEventListener("click", action[1]);
      bar.appendChild(button);
    });
  }

  function renderMultiple(container) {
    var layout = makeLayout(container, "multiple-dropdowns", routeMeta("multiple-dropdowns"), sourceFor("multiple-dropdowns", configFor("multiple-dropdowns")), "ready");
    ["classic", "material", "dark"].forEach(function (skin, index) {
      var stack = element("div", "dropdown-stack" + (skin === "dark" ? " dark-panel" : ""));
      var mount = element("div");
      stack.appendChild(mount);
      stack.appendChild(element("p", "settings-preview", "skin: " + skin));
      layout.demo.appendChild(stack);
      createDropdown(mount, {
        data: countries,
        selected: [countries[index]],
        settings: makeSettings(skin, "Dropdown " + (index + 1), { enableSearchFilter: index !== 0 })
      }, layout.record, skin);
    });
  }

  function renderListLoop(container) {
    var layout = makeLayout(container, "list-loop", routeMeta("list-loop"), sourceFor("list-loop", configFor("list-loop")), "ready");
    [0, 1, 2].forEach(function (index) {
      var mount = element("div");
      layout.demo.appendChild(mount);
      createDropdown(mount, {
        data: countries.slice(index * 5, index * 5 + 12),
        selected: [countries[index]],
        settings: makeSettings("classic", "Loop " + (index + 1), { enableSearchFilter: false })
      }, layout.record, "loop " + index);
    });
  }

  function renderDialog(container, slug) {
    var config = configFor(slug);
    var layout = makeLayout(container, slug, routeMeta(slug), sourceFor(slug, config), "dialog ready");
    var frame = element("div", "overflow-dialog-frame");
    var surface = element("div", slug === "body-overlay-auto" ? "demo-dialog-surface opens-up" : "demo-dialog-surface");
    var copy = element("div", "dialog-copy");
    copy.innerHTML = "<strong>Simulated modal surface</strong><span>overflow:hidden; dropdown should escape through appendToBody.</span>";
    var mount = element("div");
    surface.appendChild(copy);
    surface.appendChild(mount);
    frame.appendChild(surface);
    layout.demo.appendChild(frame);
    createDropdown(mount, config, layout.record, "dialog");
  }

  function renderAsync(container) {
    var config = configFor("async-object-preservation");
    var layout = makeLayout(container, "async-object-preservation", routeMeta("async-object-preservation"), sourceFor("async-object-preservation", config), "async ready");
    var bar = element("div", "method-bar");
    var mount = element("div");
    layout.demo.appendChild(bar);
    layout.demo.appendChild(mount);
    var page = 0;
    var instance = createDropdown(mount, config, layout.record, "async");
    var button = element("button", "", "Toggle async data source");
    button.type = "button";
    button.addEventListener("click", function () {
      page = page ? 0 : 1;
      var nextData = page ? countries.slice(20, 36) : countries.slice(3, 14);
      instance.setData(nextData);
      layout.record("async page", nextData.length + " items");
    });
    bar.appendChild(button);
  }

  function renderRouteContent(container, slug) {
    if (slug === "keyboard-contract") {
      renderKeyboard(container);
      return;
    }
    if (slug === "headless-aria") {
      renderHeadless(container);
      return;
    }
    if (slug === "state-hook") {
      renderStateRoute(container);
      return;
    }
    if (slug === "methods") {
      renderMethods(container);
      return;
    }
    if (slug === "multiple-dropdowns") {
      renderMultiple(container);
      return;
    }
    if (slug === "list-loop") {
      renderListLoop(container);
      return;
    }
    if (slug === "dialog" || slug === "body-overlay-auto") {
      renderDialog(container, slug);
      return;
    }
    if (slug === "async-object-preservation") {
      renderAsync(container);
      return;
    }
    renderDropdownRoute(container, slug);
  }

  function destroyInstances() {
    while (instances.length) {
      instances.pop().destroy();
    }
  }

  function navigate(slug) {
    window.history.pushState(null, "", "/" + slug);
    window.scrollTo({ top: 0, left: 0 });
    renderApp();
  }

  function renderFooter(main, activeSlug) {
    var footer = element("footer", "example-footer");
    footer.setAttribute("aria-label", "Vanilla example routes");
    var heading = element("div", "footer-heading");
    heading.appendChild(element("p", "eyebrow", "Example routes"));
    heading.appendChild(element("h2", "", "Open a focused Vanilla example"));
    footer.appendChild(heading);
    var nav = element("nav", "footer-link-grid");
    routeList.forEach(function (route) {
      var link = element("a", route.slug === activeSlug ? "active" : "");
      link.href = "/" + route.slug;
      link.appendChild(element("span", "route-title", route.title));
      link.appendChild(element("span", "route-path", "/" + route.slug));
      link.addEventListener("click", function (event) {
        event.preventDefault();
        navigate(route.slug);
      });
      nav.appendChild(link);
    });
    footer.appendChild(nav);
    main.appendChild(footer);
  }

  function renderApp() {
    destroyInstances();
    var slug = currentSlug();
    if (!routeList.some(function (route) { return route.slug === slug; })) {
      slug = "basic";
    }
    var app = document.getElementById("app");
    app.innerHTML = "";
    var main = element("main", "page shell-page");
    var topbar = element("header", "topbar");
    topbar.appendChild(element("p", "eyebrow", "Vanilla JavaScript runtime"));
    topbar.appendChild(element("h1", "", "@stackline/multiselect " + VERSION));
    main.appendChild(topbar);
    var docs = element("section", "docs-main");
    renderRouteContent(docs, slug);
    main.appendChild(docs);
    renderFooter(main, slug);
    app.appendChild(main);
  }

  window.addEventListener("popstate", renderApp);
  window.addEventListener("hashchange", renderApp);
  renderApp();
})();
