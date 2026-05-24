(function () {
  "use strict";

  var countries = [
    { id: 1, itemName: "Brazil" },
    { id: 2, itemName: "Canada" },
    { id: 3, itemName: "Portugal" },
    { id: 4, itemName: "United States" },
    { id: 5, itemName: "Argentina" },
    { id: 6, itemName: "Germany" },
    { id: 7, itemName: "Japan" },
    { id: 8, itemName: "South Africa" }
  ];

  var longCountries = [
    { id: 11, itemName: "Federative Republic of Brazil" },
    { id: 12, itemName: "United States of America" },
    { id: 13, itemName: "United Kingdom of Great Britain and Northern Ireland" },
    { id: 14, itemName: "Portuguese Republic" },
    { id: 15, itemName: "Canada" },
    { id: 16, itemName: "Argentina" }
  ];

  var groupedCountries = [
    { id: 21, itemName: "Brazil", region: "America" },
    { id: 22, itemName: "Canada", region: "America" },
    { id: 23, itemName: "Portugal", region: "Europe" },
    { id: 24, itemName: "Germany", region: "Europe" },
    { id: 25, itemName: "Japan", region: "Asia" },
    { id: 26, itemName: "South Korea", region: "Asia" }
  ];

  var templateItems = [
    { id: 31, itemName: "Primary", detail: "Main interface color", color: "#3f51b5" },
    { id: 32, itemName: "Success", detail: "Positive feedback", color: "#2e7d32" },
    { id: 33, itemName: "Warning", detail: "Attention state", color: "#ed6c02" },
    { id: 34, itemName: "Danger", detail: "Destructive state", color: "#d32f2f" },
    { id: 35, itemName: "Neutral", detail: "Text and surface", color: "#475569" }
  ];

  var largeList = buildLargeList();
  var events = ["ready"];
  var availableThemes = ["classic", "material", "dark", "custom", "brand"];
  var instances = [];

  function buildLargeList() {
    var list = [];
    for (var index = 1; index <= 80; index++) {
      var label = index < 10 ? "Item 0" + index : "Item " + index;
      list.push({ id: 100 + index, itemName: label });
    }
    return list;
  }

  function byIds(data, ids) {
    return data.filter(function (item) {
      return ids.indexOf(item.id) !== -1;
    });
  }

  function makeSettings(theme, text, options) {
    var settings = {
      singleSelection: false,
      text: text,
      selectAllText: "Select all",
      unSelectAllText: "Clear all",
      enableCheckAll: true,
      enableSearchFilter: true,
      searchPlaceholderText: "Search",
      badgeShowLimit: 4,
      maxHeight: 260,
      showCheckbox: true,
      noDataLabel: "No data",
      theme: theme,
      skin: theme
    };

    options = options || {};
    for (var key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        settings[key] = options[key];
      }
    }

    return settings;
  }

  function templateBadge(item) {
    return '<span class="swatch-chip"><span class="swatch" style="background:' + item.color + '"></span>' + item.itemName + "</span>";
  }

  function templateItem(item) {
    return [
      '<span class="option-row">',
      '<span class="swatch" style="background:' + item.color + '"></span>',
      "<span><strong>" + item.itemName + "</strong><small>" + item.detail + "</small></span>",
      "</span>"
    ].join("");
  }

  function record(type, value) {
    var label = value && value.itemName ? value.itemName : JSON.stringify(value);
    if (value && value.length) {
      label = value.length + " items";
    }
    events.unshift(type + ": " + label);
    events = events.slice(0, 12);
    renderEvents();
  }

  function renderEvents() {
    var target = document.getElementById("events");
    target.innerHTML = "";
    events.forEach(function (event) {
      var p = document.createElement("p");
      p.textContent = event;
      target.appendChild(p);
    });
  }

  function createMultiselect(target, data, selected, settings, name, templates) {
    var instance = new StacklineMultiSelect(target, {
      data: data,
      selected: selected,
      settings: settings,
      badgeTemplate: templates && templates.badgeTemplate,
      itemTemplate: templates && templates.itemTemplate,
      onSelect: function (item) {
        record(name + " select", item);
      },
      onDeSelect: function (item) {
        record(name + " deselect", item);
      },
      onSelectAll: function (items) {
        record(name + " selectAll", items);
      },
      onDeSelectAll: function (items) {
        record(name + " deselectAll", items);
      }
    });
    instances.push(instance);
    return instance;
  }

  function card(section, title, className) {
    var article = document.createElement("article");
    article.className = "case-card" + (className ? " " + className : "");
    var h3 = document.createElement("h3");
    h3.textContent = title;
    var mount = document.createElement("div");
    article.appendChild(h3);
    article.appendChild(mount);
    section.appendChild(article);
    return mount;
  }

  function makeCases(theme) {
    return [
      {
        title: "01. Basic multi",
        data: countries,
        selected: byIds(countries, [2]),
        settings: makeSettings(theme, titleFor(theme, "basic"), { enableSearchFilter: false })
      },
      {
        title: "02. Search + select all",
        data: countries,
        selected: byIds(countries, [4]),
        settings: makeSettings(theme, titleFor(theme, "search"), {})
      },
      {
        title: "03. Single without checkbox",
        data: countries,
        selected: byIds(countries, [1]),
        settings: makeSettings(theme, titleFor(theme, "single"), {
          singleSelection: true,
          showCheckbox: false,
          enableCheckAll: false
        })
      },
      {
        title: "04. Multi without checkbox",
        data: countries,
        selected: byIds(countries, [3, 6]),
        settings: makeSettings(theme, titleFor(theme, "without checkbox"), {
          showCheckbox: false,
          enableCheckAll: false
        })
      },
      {
        title: "05. Selection limit",
        data: longCountries,
        selected: byIds(longCountries, [11, 12]),
        settings: makeSettings(theme, titleFor(theme, "limit 2"), {
          limitSelection: 2,
          badgeShowLimit: 2
        })
      },
      {
        title: "06. Badge overflow",
        data: longCountries,
        selected: byIds(longCountries, [11, 12, 13, 14]),
        settings: makeSettings(theme, titleFor(theme, "badge limit"), {
          badgeShowLimit: 2,
          maxHeight: 220
        })
      },
      {
        title: "07. Grouped by region",
        data: groupedCountries,
        selected: byIds(groupedCountries, [21]),
        settings: makeSettings(theme, titleFor(theme, "grouped"), {
          groupBy: "region",
          maxHeight: 220
        })
      },
      {
        title: "08. Disabled with value",
        data: countries,
        selected: byIds(countries, [6]),
        settings: makeSettings(theme, titleFor(theme, "disabled"), {
          disabled: true
        })
      },
      {
        title: "09. Empty data",
        data: [],
        selected: [],
        settings: makeSettings(theme, titleFor(theme, "empty"), {
          noDataLabel: "No records found"
        })
      },
      {
        title: "10. Long list with scroll",
        data: largeList,
        selected: byIds(largeList, [104]),
        settings: makeSettings(theme, titleFor(theme, "scroll"), {
          maxHeight: 120,
          badgeShowLimit: 3
        })
      },
      {
        title: "11. Local lazy loading",
        data: largeList,
        selected: byIds(largeList, [106]),
        settings: makeSettings(theme, titleFor(theme, "lazy"), {
          lazyLoading: true,
          maxHeight: 120,
          badgeShowLimit: 3
        })
      },
      {
        title: "12. Item + chip template",
        data: templateItems,
        selected: byIds(templateItems, [31, 33]),
        settings: makeSettings(theme, titleFor(theme, "template"), {
          badgeShowLimit: 3,
          maxHeight: 220
        }),
        templates: {
          badgeTemplate: templateBadge,
          itemTemplate: templateItem
        }
      }
    ];
  }

  function titleFor(theme, suffix) {
    return theme.charAt(0).toUpperCase() + theme.slice(1) + " " + suffix;
  }

  function renderThemeButtons(switcher, preview) {
    var target = document.getElementById("theme-buttons");
    target.innerHTML = "";

    availableThemes.forEach(function (theme) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = theme;
      btn.className = theme === "classic" ? "active" : "";
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(target.querySelectorAll("button"), function (button) {
          button.classList.toggle("active", button === btn);
        });
        switcher.setTheme(theme);
        switcher.setSettings({ text: "Skin " + theme });
        preview.textContent = "theme: " + theme + " | skin: " + theme;
        record("skin switch theme", theme);
      });
      target.appendChild(btn);
    });
  }

  function renderSwitcher() {
    var preview = document.getElementById("settings-preview");
    var switcher = createMultiselect(
      document.getElementById("skin-switcher"),
      countries,
      byIds(countries, [2, 3, 4]),
      makeSettings("classic", "Skin classic", { badgeShowLimit: 2, maxHeight: 220 }),
      "skin switch"
    );
    preview.textContent = "theme: classic | skin: classic";
    renderThemeButtons(switcher, preview);
  }

  function renderSections() {
    var target = document.getElementById("sections");
    var themes = ["classic", "material", "dark", "custom"];

    themes.forEach(function (theme) {
      var section = document.createElement("section");
      section.className = "skin-section" + (theme === "custom" ? " custom-skin-sample" : "");
      section.setAttribute("data-theme", theme);

      var heading = document.createElement("div");
      heading.className = "section-heading";
      heading.innerHTML = '<div><p class="eyebrow">Skin</p><h2>' + titleFor(theme, "") + "</h2></div>";
      section.appendChild(heading);

      var grid = document.createElement("div");
      grid.className = "case-grid";
      section.appendChild(grid);

      makeCases(theme).forEach(function (testCase) {
        var mount = card(grid, testCase.title);
        createMultiselect(
          mount,
          testCase.data,
          testCase.selected,
          testCase.settings,
          theme + " " + testCase.title,
          testCase.templates
        );
      });

      target.appendChild(section);
    });
  }

  renderSwitcher();
  renderSections();
  renderEvents();
})();
