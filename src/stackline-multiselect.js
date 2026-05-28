(function (global) {
  "use strict";

  var DEFAULT_SETTINGS = {
    idKey: "id",
    labelKey: "itemName",
    singleSelection: false,
    text: "Select",
    selectAllText: "Select all",
    unSelectAllText: "Clear all",
    clearAllText: "Clear selected options",
    enableCheckAll: true,
    enableSearchFilter: true,
    searchPlaceholderText: "Search",
    badgeShowLimit: 4,
    showClearAll: true,
    maxHeight: 260,
    showCheckbox: true,
    noDataLabel: "No data",
    theme: "classic",
    skin: "",
    disabled: false,
    groupBy: "",
    limitSelection: 0,
    lazyLoading: false,
    lazyPageSize: 40,
    closeDropDownOnSelection: false,
    appendToBody: false,
    tagToBody: false,
    position: "bottom",
    autoPosition: true,
    searchBy: [],
    ariaLabel: "Multiselect dropdown",
    listboxAriaLabel: "Dropdown options",
    searchAriaLabel: "Search options",
    clearSearchAriaLabel: "Clear search",
    removeItemAriaLabel: "Remove selected option",
    openDropdownAriaLabel: "Open options",
    closeDropdownAriaLabel: "Close options",
    loading: false,
    loadingText: "Loading options"
  };

  function assign(target) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
      var source = arguments[sourceIndex] || {};
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeTheme(value) {
    var theme = String(value || "classic").toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    theme = theme.replace(/^-+|-+$/g, "");
    return theme || "classic";
  }

  function isActivationKey(event) {
    return event.key === "Enter" || event.key === " " || event.key === "Spacebar";
  }

  function isTextInputTarget(target) {
    return target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
  }

  function closestButton(target) {
    return target && target.closest ? target.closest("button") : null;
  }

  function sameItem(a, b, idKey) {
    if (!a || !b) {
      return false;
    }
    if (a[idKey] != null && b[idKey] != null) {
      return String(a[idKey]) === String(b[idKey]);
    }
    return a === b;
  }

  function itemValue(item, key) {
    if (item == null) {
      return "";
    }
    if (typeof item !== "object") {
      return String(item);
    }
    return item[key] != null ? String(item[key]) : "";
  }

  function itemDisabled(item) {
    return !!(item && typeof item === "object" && item.disabled);
  }

  function button(type, className, label) {
    var el = document.createElement("button");
    el.type = type || "button";
    el.className = className || "";
    el.innerHTML = label || "";
    return el;
  }

  var ICONS = {
    remove: '<svg width="100%" height="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88 c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242 C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/></g></svg>',
    clear: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 51.976 51.976" style="enable-background:new 0 0 51.976 51.976;" xml:space="preserve"><g><path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0 C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778 c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828 c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828 l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/></g></svg>',
    "angle-down": '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><g id="_x31_0_34_"><g><path d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782 c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296 c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"/></g></g></g></svg>',
    "angle-up": '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><g id="_x39__30_"><g><path d="M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27 L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832 c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"/></g></g></g></svg>',
    search: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 615.52 615.52" style="enable-background:new 0 0 615.52 615.52;" xml:space="preserve"><g><g><g id="Search__x28_and_thou_shall_find_x29_"><g><path d="M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0 C104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777 l184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291 C617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174 c-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88 s152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"/></g></g></g></g></svg>'
  };

  function icon(name) {
    var el = document.createElement("c-icon");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = ICONS[name] || "";
    return el;
  }

  function renderTemplate(target, template, item) {
    var rendered = template(item);
    target.textContent = "";

    if (rendered && rendered.nodeType) {
      target.appendChild(rendered);
      return;
    }

    target.innerHTML = String(rendered == null ? "" : rendered);
  }

  function StacklineMultiSelect(target, options) {
    this.host = typeof target === "string" ? document.querySelector(target) : target;
    if (!this.host) {
      throw new Error("StacklineMultiSelect target not found.");
    }

    options = options || {};
    this.data = asArray(options.data).slice();
    this.selectedItems = asArray(options.selected).slice();
    this.settings = assign({}, DEFAULT_SETTINGS, options.settings || {});
    this.itemTemplate = options.itemTemplate;
    this.badgeTemplate = options.badgeTemplate;
    this.handlers = {
      onSelect: options.onSelect,
      onDeSelect: options.onDeSelect,
      onSelectAll: options.onSelectAll,
      onDeSelectAll: options.onDeSelectAll,
      onChange: options.onChange,
      onOpen: options.onOpen,
      onClose: options.onClose
    };
    this.filter = "";
    this.isOpen = false;
    this.focusedKey = "";
    this.focusedOptionId = "";
    this.focusedOptionIndex = -1;
    this.lazyRenderedCount = Number(this.settings.lazyPageSize) || 40;
    this.optionRenderIndex = 0;
    this.effectivePosition = this.settings.position === "top" ? "top" : "bottom";
    this.instanceId = "stackline-ms-" + Math.random().toString(36).slice(2);
    this.root = null;
    this.dropdownElement = null;

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDocumentKeydown = this.handleDocumentKeydown.bind(this);
    this.updateDropdownPosition = this.updateDropdownPosition.bind(this);
    document.addEventListener("click", this.handleOutsideClick, true);
    document.addEventListener("keydown", this.handleDocumentKeydown, true);
    window.addEventListener("resize", this.updateDropdownPosition);
    window.addEventListener("scroll", this.updateDropdownPosition, true);
    this.render();
  }

  StacklineMultiSelect.prototype.destroy = function () {
    document.removeEventListener("click", this.handleOutsideClick, true);
    document.removeEventListener("keydown", this.handleDocumentKeydown, true);
    window.removeEventListener("resize", this.updateDropdownPosition);
    window.removeEventListener("scroll", this.updateDropdownPosition, true);
    this.removeBodyDropdown();
    this.host.innerHTML = "";
  };

  StacklineMultiSelect.prototype.setData = function (data) {
    this.data = asArray(data).slice();
    this.render();
  };

  StacklineMultiSelect.prototype.setSelected = function (items) {
    this.selectedItems = asArray(items).slice();
    this.render();
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.setSettings = function (settings) {
    this.settings = assign({}, this.settings, settings || {});
    this.lazyRenderedCount = Number(this.settings.lazyPageSize) || 40;
    this.render();
  };

  StacklineMultiSelect.prototype.setTheme = function (theme) {
    this.settings.theme = theme;
    this.settings.skin = theme;
    this.render();
  };

  StacklineMultiSelect.prototype.getSelected = function () {
    return this.selectedItems.slice();
  };

  StacklineMultiSelect.prototype.getThemeName = function () {
    return normalizeTheme(this.settings.skin || this.settings.theme || "classic");
  };

  StacklineMultiSelect.prototype.getDropdownClasses = function () {
    var theme = this.getThemeName();
    var classes = ["stackline-dropdown", "theme-" + theme, "skin-" + theme];
    if (["classic", "material", "dark", "custom", "brand"].indexOf(theme) === -1) {
      classes.push("theme-custom");
    }
    if (this.isOpen) {
      classes.push("is-open");
    }
    if (this.settings.disabled) {
      classes.push("is-disabled");
    }
    classes.push(this.effectivePosition === "top" ? "opens-up" : "opens-down");
    return classes.join(" ");
  };

  StacklineMultiSelect.prototype.emit = function (name, payload) {
    if (typeof this.handlers[name] === "function") {
      this.handlers[name](payload, this);
    }
  };

  StacklineMultiSelect.prototype.render = function () {
    this.removeBodyDropdown();
    this.host.innerHTML = "";
    this.root = document.createElement("div");
    this.root.className = this.getDropdownClasses();
    this.root.appendChild(this.renderButton());
    this.root.appendChild(this.renderDropdown());
    this.host.appendChild(this.root);
    if (this.isOpen) {
      this.attachDropdownToBody();
      this.updateDropdownPosition();
    }
  };

  StacklineMultiSelect.prototype.renderButton = function () {
    var wrapper = document.createElement("div");
    wrapper.className = "selected-list";

    var trigger = document.createElement("div");
    var triggerClasses = ["c-btn"];
    if (this.settings.disabled) {
      triggerClasses.push("disabled");
    }
    if (this.shouldShowClearAll()) {
      triggerClasses.push("has-clear");
    }
    if (this.selectedItems.length > 0) {
      triggerClasses.push("has-selection");
    }
    if (this.settings.singleSelection) {
      triggerClasses.push("single-select-mode");
    }
    if (this.isOpen) {
      triggerClasses.push("is-active");
    }
    trigger.className = triggerClasses.join(" ");
    trigger.setAttribute("role", "combobox");
    trigger.tabIndex = this.settings.disabled ? -1 : 0;
    trigger.setAttribute("aria-disabled", this.settings.disabled ? "true" : "false");
    trigger.setAttribute("aria-expanded", this.isOpen ? "true" : "false");
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-controls", this.instanceId + "-listbox");
    trigger.setAttribute("aria-label", this.triggerAriaLabel());
    if (this.focusedOptionId || this.focusedKey) {
      trigger.setAttribute("aria-activedescendant", this.focusedOptionId || this.optionId(this.focusedKey));
    }
    trigger.addEventListener("click", this.toggleDropdown.bind(this));
    trigger.addEventListener("keydown", this.handleTriggerKeydown.bind(this));

    if (this.selectedItems.length === 0) {
      var placeholder = document.createElement("span");
      placeholder.className = "c-placeholder";
      placeholder.textContent = this.settings.text;
      trigger.appendChild(placeholder);
    } else if (this.settings.singleSelection) {
      var single = document.createElement("span");
      single.className = "c-single-value";
      single.textContent = this.itemLabel(this.selectedItems[0]);
      trigger.appendChild(single);
    } else {
      trigger.appendChild(this.renderTokens());
      if (this.selectedItems.length > this.settings.badgeShowLimit) {
        var count = document.createElement("span");
        count.className = "countplaceholder";
        count.textContent = "+" + (this.selectedItems.length - this.settings.badgeShowLimit);
        trigger.appendChild(count);
      }
    }

    if (this.shouldShowClearAll()) {
      trigger.appendChild(this.renderClearAllButton());
    }

    var caret = button("button", "c-arrow-toggle " + (this.isOpen ? "c-angle-up" : "c-angle-down"), "");
    caret.appendChild(icon(this.isOpen ? "angle-up" : "angle-down"));
    caret.setAttribute("aria-label", this.isOpen ? this.settings.closeDropdownAriaLabel : this.settings.openDropdownAriaLabel);
    caret.setAttribute("aria-expanded", this.isOpen ? "true" : "false");
    caret.setAttribute("aria-controls", this.instanceId + "-listbox");
    caret.addEventListener("click", this.toggleDropdown.bind(this));
    caret.addEventListener("keydown", this.handleInlineButtonKeydown.bind(this));
    trigger.appendChild(caret);

    wrapper.appendChild(trigger);
    return wrapper;
  };

  StacklineMultiSelect.prototype.renderClearAllButton = function () {
    var clear = button("button", "c-remove clear-all", "");
    clear.appendChild(icon("remove"));
    clear.disabled = !!this.settings.disabled;
    clear.setAttribute("aria-label", this.settings.clearAllText);
    clear.addEventListener("click", this.clearSelected.bind(this));
    clear.addEventListener("keydown", this.handleInlineButtonKeydown.bind(this));
    return clear;
  };

  StacklineMultiSelect.prototype.renderTokens = function () {
    var list = document.createElement("div");
    list.className = "c-list c-chip-list";

    var limit = Number(this.settings.badgeShowLimit) || 0;
    var visible = this.selectedItems.slice(0, limit);

    for (var index = 0; index < visible.length; index++) {
      var item = visible[index];
      var token = document.createElement("div");
      token.className = "c-token";

      var label = document.createElement("span");
      label.className = "c-label";
      if (typeof this.badgeTemplate === "function") {
        renderTemplate(label, this.badgeTemplate, item);
      } else {
        label.textContent = this.itemLabel(item);
      }

      var remove = button("button", "c-remove", "");
      remove.appendChild(icon("remove"));
      remove.disabled = !!this.settings.disabled;
      remove.setAttribute("aria-label", this.settings.removeItemAriaLabel + ": " + this.itemLabel(item));
      remove.addEventListener("click", this.removeItem.bind(this, item));
      remove.addEventListener("keydown", this.handleInlineButtonKeydown.bind(this));

      token.appendChild(label);
      token.appendChild(remove);
      list.appendChild(token);
    }

    return list;
  };

  StacklineMultiSelect.prototype.renderDropdown = function () {
    var dropdown = document.createElement("div");
    var theme = this.getThemeName();
    var dropdownClasses = ["dropdown-list", "animated", "fadeIn", "skin-" + theme, "theme-" + theme];
    if (["classic", "material", "dark", "custom", "brand"].indexOf(theme) === -1) {
      dropdownClasses.push("theme-custom");
    }
    if (this.shouldAppendToBody()) {
      dropdownClasses.push("tagToBody", "body-overlay");
    }
    if (this.isOpen) {
      dropdownClasses.push("is-open");
    }
    dropdownClasses.push(this.effectivePosition === "top" ? "opens-up" : "opens-down");
    dropdown.className = dropdownClasses.join(" ");
    dropdown.hidden = !this.isOpen;
    dropdown.id = this.instanceId + "-panel";
    dropdown.setAttribute("role", "presentation");
    dropdown.setAttribute("aria-hidden", this.isOpen ? "false" : "true");
    dropdown.addEventListener("keydown", this.handleListKeydown.bind(this));
    this.dropdownElement = dropdown;

    var area = document.createElement("div");
    area.className = "list-area" + (this.settings.singleSelection ? " single-select-mode" : "");

    var arrowClass = this.effectivePosition === "top" ? "arrow-down" : "arrow-up";
    var arrowBorder = document.createElement("div");
    arrowBorder.className = arrowClass + " arrow-2";
    var arrow = document.createElement("div");
    arrow.className = arrowClass;
    dropdown.appendChild(arrowBorder);
    dropdown.appendChild(arrow);

    if (this.showSelectAll()) {
      area.appendChild(this.renderSelectAll());
    }

    if (this.settings.enableSearchFilter) {
      area.appendChild(this.renderSearch());
    }

    area.appendChild(this.renderOptions());
    dropdown.appendChild(area);
    return dropdown;
  };

  StacklineMultiSelect.prototype.renderSelectAll = function () {
    var row = document.createElement("div");
    row.className = "pure-checkbox select-all";
    row.tabIndex = 0;
    row.setAttribute("role", "checkbox");
    row.setAttribute("aria-checked", this.allVisibleSelected() ? "true" : "false");
    row.setAttribute("aria-label", row.textContent);
    row.addEventListener("click", this.toggleSelectAll.bind(this));
    row.addEventListener("keydown", this.handleSelectAllKeydown.bind(this));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = this.allVisibleSelected();
    input.tabIndex = -1;
    input.id = this.instanceId + "-select-all";
    input.setAttribute("aria-hidden", "true");

    var label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.textContent = this.allVisibleSelected()
      ? this.settings.unSelectAllText
      : this.settings.selectAllText;

    row.appendChild(input);
    row.appendChild(label);
    row.setAttribute("aria-label", label.textContent);
    return row;
  };

  StacklineMultiSelect.prototype.renderSearch = function () {
    var filter = document.createElement("label");
    filter.className = "list-filter";

    var searchIcon = document.createElement("span");
    searchIcon.className = "c-search";
    searchIcon.setAttribute("aria-hidden", "true");
    searchIcon.appendChild(icon("search"));

    if (this.filter) {
      var clear = button("button", "c-clear", "");
      clear.setAttribute("aria-label", this.settings.clearSearchAriaLabel);
      clear.appendChild(icon("clear"));
      clear.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.filter = "";
        this.render();
        this.focusSearch();
      }.bind(this));
      clear.addEventListener("keydown", this.handleInlineButtonKeydown.bind(this));
      filter.appendChild(clear);
    }

    var input = document.createElement("input");
    input.type = "search";
    input.value = this.filter;
    input.placeholder = this.settings.searchPlaceholderText;
    input.setAttribute("aria-label", this.settings.searchAriaLabel);
    input.addEventListener("input", this.handleFilter.bind(this));
    input.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    input.addEventListener("keydown", this.handleListKeydown.bind(this));

    filter.appendChild(searchIcon);
    filter.appendChild(input);
    return filter;
  };

  StacklineMultiSelect.prototype.renderOptions = function () {
    var filtered = this.filteredItems();
    var wrapper = document.createElement("div");
    wrapper.className = "options-shell";
    this.optionRenderIndex = 0;

    if (filtered.length === 0) {
      var empty = document.createElement("p");
      empty.className = "list-message";
      empty.textContent = this.settings.noDataLabel;
      wrapper.appendChild(empty);
      return wrapper;
    }

    if (this.settings.groupBy) {
      wrapper.appendChild(this.renderGroupedOptions(filtered));
      return wrapper;
    }

    var ul = document.createElement("ul");
    ul.className = "lazyContainer";
    ul.id = this.instanceId + "-listbox";
    ul.setAttribute("role", "listbox");
    ul.setAttribute("aria-label", this.settings.listboxAriaLabel);
    ul.setAttribute("aria-multiselectable", this.settings.singleSelection ? "false" : "true");
    ul.tabIndex = -1;
    ul.style.maxHeight = Number(this.settings.maxHeight || 260) + "px";
    ul.addEventListener("scroll", this.handleListScroll.bind(this));
    ul.addEventListener("keydown", this.handleListKeydown.bind(this));

    var items = this.settings.loading ? [] : this.itemsForRender(filtered);
    if (this.settings.loading) {
      var loading = document.createElement("li");
      loading.className = "list-message";
      loading.setAttribute("role", "status");
      loading.textContent = this.settings.loadingText;
      ul.appendChild(loading);
    }
    for (var index = 0; index < items.length; index++) {
      ul.appendChild(this.renderOption(items[index]));
    }

    wrapper.appendChild(ul);
    this.appendLazyMessage(wrapper, filtered, items);
    return wrapper;
  };

  StacklineMultiSelect.prototype.renderGroupedOptions = function (items) {
    var shell = document.createElement("div");
    shell.className = "group-shell";
    shell.style.maxHeight = Number(this.settings.maxHeight || 260) + "px";
    shell.id = this.instanceId + "-listbox";
    shell.setAttribute("role", "listbox");
    shell.setAttribute("aria-label", this.settings.listboxAriaLabel);
    shell.setAttribute("aria-multiselectable", this.settings.singleSelection ? "false" : "true");
    shell.tabIndex = -1;
    shell.addEventListener("scroll", this.handleListScroll.bind(this));
    shell.addEventListener("keydown", this.handleListKeydown.bind(this));

    var groups = this.groupItems(items);
    for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      var groupData = groups[groupIndex];
      var group = document.createElement("ul");
      group.className = "list-grp";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", groupData.label);
      group.setAttribute("data-stackline-group", groupData.key);

      var title = document.createElement("h4");
      title.textContent = groupData.label;
      group.appendChild(title);

      var groupItems = this.itemsForRender(groupData.items);
      for (var itemIndex = 0; itemIndex < groupItems.length; itemIndex++) {
        var option = this.renderOption(groupItems[itemIndex]);
        if (!this.settings.singleSelection) {
          option.classList.add("grp-item");
        }
        group.appendChild(option);
      }
      shell.appendChild(group);
    }

    return shell;
  };

  StacklineMultiSelect.prototype.renderOption = function (item) {
    var li = document.createElement("li");
    var selected = this.isSelected(item);
    var disabled = this.isLimitReached(item) || itemDisabled(item) || this.settings.disabled;
    var key = this.itemKey(item);
    var optionIndex = this.optionRenderIndex++;
    var classes = ["pure-checkbox", "dropdown-option"];
    if (selected) {
      classes.push("selected-item");
    }
    if (disabled) {
      classes.push("is-disabled");
    }
    if (this.focusedKey === key) {
      classes.push("active");
    }
    li.className = classes.join(" ");
    li.id = this.optionId(key, optionIndex);
    li.tabIndex = disabled ? -1 : 0;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", selected ? "true" : "false");
    li.setAttribute("aria-disabled", disabled ? "true" : "false");
    li.setAttribute("data-stackline-option", "true");
    li.setAttribute("data-key", key);
    li.setAttribute("data-option-index", String(optionIndex));
    li.addEventListener("click", this.toggleItem.bind(this, item));
    li.addEventListener("keydown", this.handleOptionKeydown.bind(this, item));
    li.addEventListener("focus", this.handleOptionFocus.bind(this, item));
    li.addEventListener("mouseenter", this.handleOptionMouseEnter.bind(this, item));

    if (this.settings.showCheckbox) {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.checked = selected;
      input.disabled = disabled;
      input.tabIndex = -1;
      input.setAttribute("aria-hidden", "true");
      li.appendChild(input);
    }

    var label = document.createElement("label");
    if (!this.settings.showCheckbox) {
      label.className = "no-checkbox-label";
    }

    if (typeof this.itemTemplate === "function") {
      renderTemplate(label, this.itemTemplate, item);
    } else {
      label.textContent = this.itemLabel(item);
    }

    li.appendChild(label);
    return li;
  };

  StacklineMultiSelect.prototype.toggleDropdown = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (closestButton(event.target) && !event.target.closest(".c-arrow-toggle")) {
        return;
      }
    }
    if (this.settings.disabled) {
      return;
    }
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  };

  StacklineMultiSelect.prototype.openDropdown = function () {
    if (this.settings.disabled || this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.render();
    this.focusTrigger();
    this.emit("onOpen", this.getSelected());
  };

  StacklineMultiSelect.prototype.handleTriggerKeydown = function (event) {
    if (isActivationKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      if (this.isOpen) {
        this.closeDropdown(true);
      } else {
        this.openDropdown();
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.openDropdown();
      this.focusFirstOption();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.openDropdown();
      this.focusLastOption();
      return;
    }
    if (event.key === "Escape") {
      this.closeDropdown(true);
    }
  };

  StacklineMultiSelect.prototype.closeDropdown = function (restoreFocus) {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.focusedKey = "";
    this.focusedOptionId = "";
    this.focusedOptionIndex = -1;
    this.render();
    if (restoreFocus) {
      this.focusTrigger();
    }
    this.emit("onClose", this.getSelected());
  };

  StacklineMultiSelect.prototype.handleOutsideClick = function (event) {
    if (!this.isOpen) {
      return;
    }
    if ((this.root && this.root.contains(event.target)) || (this.dropdownElement && this.dropdownElement.contains(event.target))) {
      return;
    }
    if (this.root) {
      this.closeDropdown();
    }
  };

  StacklineMultiSelect.prototype.handleDocumentKeydown = function (event) {
    if (this.isOpen && event.key === "Escape") {
      this.closeDropdown(true);
    }
  };

  StacklineMultiSelect.prototype.handleFilter = function (event) {
    this.filter = event.target.value;
    this.render();
    var input = this.dropdownElement && this.dropdownElement.querySelector(".list-filter input");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };

  StacklineMultiSelect.prototype.handleInlineButtonKeydown = function (event) {
    if (isActivationKey(event)) {
      event.stopPropagation();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      this.openDropdown();
      this.focusFirstOption();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
      this.openDropdown();
      this.focusLastOption();
    }
  };

  StacklineMultiSelect.prototype.handleSelectAllKeydown = function (event) {
    if (isActivationKey(event)) {
      this.toggleSelectAll(event);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.closeDropdown(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      this.focusFirstOption();
    }
  };

  StacklineMultiSelect.prototype.handleOptionKeydown = function (item, event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.closeDropdown(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      this.focusRelativeOption(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      event.stopPropagation();
      this.focusRelativeOption(-1);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      event.stopPropagation();
      this.focusFirstOption();
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      event.stopPropagation();
      this.focusLastOption();
      return;
    }
    if (isActivationKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleItem(item, event);
    }
  };

  StacklineMultiSelect.prototype.handleListKeydown = function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.closeDropdown(true);
      return;
    }
    if (isTextInputTarget(event.target) && event.key !== "ArrowDown") {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      this.focusFirstOption();
    }
  };

  StacklineMultiSelect.prototype.handleOptionFocus = function (item) {
    this.focusedKey = this.itemKey(item);
    this.captureFocusedOption(document.activeElement);
    this.syncAriaActiveDescendant();
    this.loadMoreIfLastVisible(item);
  };

  StacklineMultiSelect.prototype.handleOptionMouseEnter = function (item, event) {
    this.focusedKey = this.itemKey(item);
    this.captureFocusedOption(event && event.currentTarget);
    this.syncAriaActiveDescendant();
  };

  StacklineMultiSelect.prototype.handleListScroll = function (event) {
    var target = event.target;
    if (!this.settings.lazyLoading || !target || target.scrollTop + target.clientHeight < target.scrollHeight - 4) {
      return;
    }
    this.loadMoreOptions();
  };

  StacklineMultiSelect.prototype.toggleSelectAll = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var items = this.filteredItems().filter(function (item) {
      return !itemDisabled(item);
    });

    if (this.allVisibleSelected()) {
      this.selectedItems = this.selectedItems.filter(function (selected) {
        return !items.some(function (item) {
          return sameItem(selected, item, this.settings.idKey);
        }, this);
      }, this);
      this.emit("onDeSelectAll", items);
    } else {
      for (var index = 0; index < items.length; index++) {
        if (this.isLimitReached(items[index])) {
          break;
        }
        if (!this.isSelected(items[index])) {
          this.selectedItems.push(items[index]);
        }
      }
      this.emit("onSelectAll", this.getSelected());
    }

    this.render();
    if (this.isOpen) {
      this.focusSelectAll();
    }
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.toggleItem = function (item, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.settings.disabled || itemDisabled(item)) {
      return;
    }
    if (this.isSelected(item)) {
      this.removeItem(item, event);
      return;
    }
    if (this.isLimitReached(item)) {
      return;
    }
    var key = this.itemKey(item);
    var optionIndex = this.currentOptionIndex();
    if (this.settings.singleSelection) {
      this.selectedItems = [item];
      this.isOpen = false;
    } else {
      this.selectedItems.push(item);
    }
    if (this.settings.closeDropDownOnSelection) {
      this.isOpen = false;
    }
    this.render();
    if (this.isOpen) {
      this.focusOptionAtIndex(optionIndex, key);
    } else {
      this.focusTrigger();
    }
    this.emit("onSelect", item);
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.removeItem = function (item, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.settings.disabled) {
      return;
    }
    this.selectedItems = this.selectedItems.filter(function (selected) {
      return !sameItem(selected, item, this.settings.idKey);
    }, this);
    var optionIndex = this.currentOptionIndex();
    this.render();
    if (this.isOpen) {
      this.focusOptionAtIndex(optionIndex, this.itemKey(item));
    } else {
      this.focusTrigger();
    }
    this.emit("onDeSelect", item);
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.clearSelected = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.settings.disabled || this.selectedItems.length === 0) {
      return;
    }

    var removed = this.getSelected();
    this.selectedItems = [];
    this.render();
    this.focusTrigger();
    this.emit("onDeSelectAll", removed);
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.clearSelection = function (event) {
    this.clearSelected(event);
  };

  StacklineMultiSelect.prototype.selectAll = function (event) {
    this.toggleSelectAll(event);
  };

  StacklineMultiSelect.prototype.deSelectAll = function (event) {
    this.clearSelected(event);
  };

  StacklineMultiSelect.prototype.shouldShowClearAll = function () {
    return this.settings.showClearAll !== false && this.selectedItems.length > 0;
  };

  StacklineMultiSelect.prototype.isSelected = function (item) {
    return this.selectedItems.some(function (selected) {
      return sameItem(selected, item, this.settings.idKey);
    }, this);
  };

  StacklineMultiSelect.prototype.isLimitReached = function (item) {
    var limit = Number(this.settings.limitSelection) || 0;
    return limit > 0 && !this.isSelected(item) && this.selectedItems.length >= limit;
  };

  StacklineMultiSelect.prototype.itemLabel = function (item) {
    if (item == null) {
      return "";
    }
    if (typeof item !== "object") {
      return String(item);
    }
    return item[this.settings.labelKey] != null ? String(item[this.settings.labelKey]) : "";
  };

  StacklineMultiSelect.prototype.itemKey = function (item) {
    var value = itemValue(item, this.settings.idKey);
    return value || this.itemLabel(item);
  };

  StacklineMultiSelect.prototype.optionId = function (key, index) {
    var prefix = index == null ? "" : String(index) + "-";
    return this.instanceId + "-option-" + prefix + String(key).replace(/[^a-zA-Z0-9_-]+/g, "-");
  };

  StacklineMultiSelect.prototype.triggerAriaLabel = function () {
    if (!this.selectedItems.length) {
      return this.settings.ariaLabel;
    }
    return this.settings.ariaLabel + ": " + this.selectedItems.map(function (item) {
      return this.itemLabel(item);
    }, this).join(", ");
  };

  StacklineMultiSelect.prototype.filteredItems = function () {
    var query = this.filter.trim().toLowerCase();
    if (!query) {
      return this.data.slice();
    }
    return this.data.filter(function (item) {
      var values = [this.itemLabel(item)];
      var keys = Array.isArray(this.settings.searchBy) ? this.settings.searchBy : [];
      for (var index = 0; index < keys.length; index++) {
        values.push(itemValue(item, keys[index]));
      }
      return values.join(" ").toLowerCase().indexOf(query) !== -1;
    }, this);
  };

  StacklineMultiSelect.prototype.itemsForRender = function (items) {
    if (!this.settings.lazyLoading) {
      return items;
    }
    return items.slice(0, this.lazyRenderedCount);
  };

  StacklineMultiSelect.prototype.groupValue = function (item) {
    if (typeof this.settings.groupBy === "function") {
      return this.settings.groupBy(item);
    }
    return item && this.settings.groupBy ? item[this.settings.groupBy] : "";
  };

  StacklineMultiSelect.prototype.groupLabel = function (value) {
    if (value == null || value === "") {
      return "Other";
    }
    if (typeof value !== "object") {
      return String(value);
    }
    var keys = ["label", "name", "itemName", "title", "value", "id"];
    for (var index = 0; index < keys.length; index++) {
      if (value[keys[index]] != null && value[keys[index]] !== "") {
        return String(value[keys[index]]);
      }
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  };

  StacklineMultiSelect.prototype.groupKey = function (value) {
    if (value == null || value === "") {
      return "__stackline_group_other";
    }
    if (typeof value !== "object") {
      return String(value);
    }
    var keys = ["id", "key", "value", "label", "name", "itemName", "title"];
    for (var index = 0; index < keys.length; index++) {
      if (value[keys[index]] != null && value[keys[index]] !== "") {
        return String(value[keys[index]]);
      }
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  };

  StacklineMultiSelect.prototype.groupItems = function (items) {
    var groups = [];
    var lookup = Object.create(null);
    for (var index = 0; index < items.length; index++) {
      var value = this.groupValue(items[index]);
      var key = this.groupKey(value);
      var label = this.groupLabel(value);
      if (!lookup[key]) {
        lookup[key] = { key: key, label: label, items: [] };
        groups.push(lookup[key]);
      }
      lookup[key].items.push(items[index]);
    }
    return groups;
  };

  StacklineMultiSelect.prototype.renderableItems = function () {
    var filtered = this.filteredItems();
    if (!this.settings.groupBy) {
      return this.itemsForRender(filtered);
    }
    var rendered = [];
    var groups = this.groupItems(filtered);
    for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      var groupItems = this.itemsForRender(groups[groupIndex].items);
      for (var itemIndex = 0; itemIndex < groupItems.length; itemIndex++) {
        rendered.push(groupItems[itemIndex]);
      }
    }
    return rendered;
  };

  StacklineMultiSelect.prototype.appendLazyMessage = function (wrapper, filtered, rendered) {
    if (!this.settings.lazyLoading || filtered.length <= rendered.length) {
      return;
    }
    var message = document.createElement("p");
    message.className = "list-message list-message-subtle";
    message.textContent = rendered.length + " of " + filtered.length + " items";
    wrapper.appendChild(message);
  };

  StacklineMultiSelect.prototype.showSelectAll = function () {
    return this.settings.enableCheckAll && !this.settings.singleSelection && !this.settings.limitSelection;
  };

  StacklineMultiSelect.prototype.allVisibleSelected = function () {
    var items = this.filteredItems();
    return items.length > 0 && items.every(function (item) {
      return this.isSelected(item);
    }, this);
  };

  StacklineMultiSelect.prototype.visibleSelectableItems = function () {
    return this.renderableItems().filter(function (item) {
      return !itemDisabled(item) && !this.isLimitReached(item);
    }, this);
  };

  StacklineMultiSelect.prototype.focusFirstOption = function () {
    var options = this.focusableOptionElements();
    if (options[0]) {
      this.focusOptionElement(options[0]);
      return;
    }
    var items = this.visibleSelectableItems();
    if (items[0]) {
      this.focusOption(items[0]);
    }
  };

  StacklineMultiSelect.prototype.focusLastOption = function () {
    var options = this.focusableOptionElements();
    if (options.length) {
      this.focusOptionElement(options[options.length - 1]);
      return;
    }
    var items = this.visibleSelectableItems();
    if (items.length) {
      this.focusOption(items[items.length - 1]);
    }
  };

  StacklineMultiSelect.prototype.focusRelativeOption = function (delta) {
    var options = this.focusableOptionElements();
    if (options.length) {
      var active = document.activeElement;
      var index = options.indexOf(active);
      if (index === -1 && this.focusedOptionId) {
        for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
          if (options[optionIndex].id === this.focusedOptionId) {
            index = optionIndex;
            break;
          }
        }
      }
      if (index === -1) {
        index = delta > 0 ? -1 : options.length;
      }
      index = Math.max(0, Math.min(options.length - 1, index + delta));
      this.focusOptionElement(options[index]);
      return;
    }

    var items = this.visibleSelectableItems();
    if (!items.length) {
      return;
    }
    var itemIndexValue = 0;
    for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
      if (this.itemKey(items[itemIndex]) === this.focusedKey) {
        itemIndexValue = itemIndex;
        break;
      }
    }
    itemIndexValue = Math.max(0, Math.min(items.length - 1, itemIndexValue + delta));
    this.focusOption(items[itemIndexValue]);
  };

  StacklineMultiSelect.prototype.focusOption = function (item) {
    var key = this.itemKey(item);
    this.focusedKey = key;
    this.syncAriaActiveDescendant();
    this.focusOptionByKey(key);
    this.loadMoreIfLastVisible(item);
  };

  StacklineMultiSelect.prototype.focusOptionByKey = function (key) {
    var option = this.findOptionElementByKey(key);
    if (option) {
      this.focusOptionElement(option);
    }
  };

  StacklineMultiSelect.prototype.focusOptionAtIndex = function (index, fallbackKey) {
    var options = this.optionElements();
    var option = index >= 0 && index < options.length ? options[index] : null;
    if (!option && fallbackKey) {
      option = this.findOptionElementByKey(fallbackKey);
    }
    if (option) {
      this.focusOptionElement(option);
    }
  };

  StacklineMultiSelect.prototype.focusOptionElement = function (option) {
    if (!option) {
      return;
    }
    this.captureFocusedOption(option);
    this.syncAriaActiveDescendant();
    option.focus({ preventScroll: true });
    option.scrollIntoView({ block: "nearest" });
    var item = this.itemForOptionElement(option);
    if (item) {
      this.loadMoreIfLastVisible(item);
    }
  };

  StacklineMultiSelect.prototype.captureFocusedOption = function (option) {
    if (!option || !option.getAttribute || option.getAttribute("data-stackline-option") !== "true") {
      return;
    }
    this.focusedKey = option.getAttribute("data-key") || "";
    this.focusedOptionId = option.id || "";
    this.focusedOptionIndex = this.optionIndexFromElement(option);
  };

  StacklineMultiSelect.prototype.optionElements = function () {
    var root = this.dropdownElement || this.root;
    if (!root) {
      return [];
    }
    return Array.prototype.slice.call(root.querySelectorAll('[data-stackline-option="true"]'));
  };

  StacklineMultiSelect.prototype.focusableOptionElements = function () {
    return this.optionElements().filter(function (option) {
      return option.getAttribute("aria-disabled") !== "true";
    });
  };

  StacklineMultiSelect.prototype.findOptionElementByKey = function (key) {
    var options = this.optionElements();
    for (var index = 0; index < options.length; index++) {
      if (options[index].getAttribute("data-key") === String(key)) {
        return options[index];
      }
    }
    return null;
  };

  StacklineMultiSelect.prototype.optionIndexFromElement = function (option) {
    var value = option && option.getAttribute ? Number(option.getAttribute("data-option-index")) : -1;
    return isFinite(value) ? value : -1;
  };

  StacklineMultiSelect.prototype.currentOptionIndex = function () {
    var active = document.activeElement;
    if (active && active.getAttribute && active.getAttribute("data-stackline-option") === "true") {
      return this.optionIndexFromElement(active);
    }
    return this.focusedOptionIndex;
  };

  StacklineMultiSelect.prototype.itemForOptionElement = function (option) {
    var index = this.optionIndexFromElement(option);
    if (index < 0) {
      return null;
    }
    return this.renderableItems()[index] || null;
  };

  StacklineMultiSelect.prototype.focusTrigger = function () {
    var trigger = this.root && this.root.querySelector(".c-btn");
    if (trigger) {
      trigger.focus({ preventScroll: true });
    }
  };

  StacklineMultiSelect.prototype.focusSelectAll = function () {
    var selectAll = this.dropdownElement && this.dropdownElement.querySelector(".select-all");
    if (selectAll) {
      selectAll.focus({ preventScroll: true });
    }
  };

  StacklineMultiSelect.prototype.focusSearch = function () {
    this.openDropdown();
    var input = this.dropdownElement && this.dropdownElement.querySelector(".list-filter input");
    if (input) {
      input.focus();
    }
  };

  StacklineMultiSelect.prototype.syncAriaActiveDescendant = function () {
    if (!this.root) {
      return;
    }
    var trigger = this.root.querySelector(".c-btn");
    if (trigger && (this.focusedOptionId || this.focusedKey)) {
      trigger.setAttribute("aria-activedescendant", this.focusedOptionId || this.optionId(this.focusedKey));
    }
  };

  StacklineMultiSelect.prototype.loadMoreIfLastVisible = function (item) {
    if (!this.settings.lazyLoading) {
      return;
    }
    var rendered = this.renderableItems();
    if (rendered.length && this.itemKey(rendered[rendered.length - 1]) === this.itemKey(item)) {
      this.loadMoreOptions();
    }
  };

  StacklineMultiSelect.prototype.loadMoreOptions = function () {
    var total = this.filteredItems().length;
    if (this.lazyRenderedCount >= total) {
      return;
    }
    this.lazyRenderedCount = Math.min(total, this.lazyRenderedCount + (Number(this.settings.lazyPageSize) || 40));
    this.render();
    if (this.focusedKey) {
      this.focusOptionByKey(this.focusedKey);
    }
    this.emit("onScrollToEnd", {
      rendered: this.lazyRenderedCount,
      total: total
    });
  };

  StacklineMultiSelect.prototype.shouldAppendToBody = function () {
    return !!(this.settings.appendToBody || this.settings.tagToBody);
  };

  StacklineMultiSelect.prototype.attachDropdownToBody = function () {
    if (!this.shouldAppendToBody() || !this.dropdownElement || !this.isOpen || this.dropdownElement.parentNode === document.body) {
      return;
    }
    document.body.appendChild(this.dropdownElement);
  };

  StacklineMultiSelect.prototype.removeBodyDropdown = function () {
    if (this.dropdownElement && this.dropdownElement.parentNode && this.dropdownElement.parentNode !== this.root) {
      this.dropdownElement.parentNode.removeChild(this.dropdownElement);
    }
    this.dropdownElement = null;
  };

  StacklineMultiSelect.prototype.updateDropdownPosition = function () {
    if (!this.isOpen || !this.root || !this.dropdownElement) {
      return;
    }
    var trigger = this.root.querySelector(".c-btn");
    var list = this.dropdownElement.querySelector(".lazyContainer, .group-shell");
    if (!trigger) {
      return;
    }
    var rect = trigger.getBoundingClientRect();
    var gap = 8;
    var viewportPadding = 8;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var maxHeight = Number(this.settings.maxHeight || 260);
    var spaceTop = rect.top;
    var spaceBottom = viewportHeight - rect.bottom;
    var preferred = this.settings.position === "top" ? "top" : "bottom";
    this.effectivePosition = this.settings.autoPosition && spaceBottom < maxHeight && spaceTop > spaceBottom + 48 ? "top" : preferred;
    this.syncDropdownDirectionClass();

    if (!this.shouldAppendToBody()) {
      return;
    }

    var available = this.effectivePosition === "top"
      ? Math.max(80, rect.top - gap - viewportPadding)
      : Math.max(80, viewportHeight - rect.bottom - gap - viewportPadding);
    if (list) {
      list.style.maxHeight = Math.min(maxHeight, available) + "px";
    }
    var dropdownHeight = this.dropdownElement.offsetHeight || Math.min(maxHeight + 92, 420);
    var top = this.effectivePosition === "top" ? Math.max(viewportPadding, rect.top - dropdownHeight - gap) : rect.bottom + gap;
    var width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
    var left = Math.min(Math.max(viewportPadding, rect.left), window.innerWidth - width - viewportPadding);
    this.dropdownElement.style.position = "fixed";
    this.dropdownElement.style.top = top + "px";
    this.dropdownElement.style.left = left + "px";
    this.dropdownElement.style.width = width + "px";
    this.dropdownElement.style.maxWidth = "calc(100vw - 16px)";
    this.dropdownElement.style.zIndex = "100000";
  };

  StacklineMultiSelect.prototype.syncDropdownDirectionClass = function () {
    if (this.root) {
      this.root.classList.toggle("opens-up", this.effectivePosition === "top");
      this.root.classList.toggle("opens-down", this.effectivePosition !== "top");
    }
    if (this.dropdownElement) {
      this.dropdownElement.classList.toggle("opens-up", this.effectivePosition === "top");
      this.dropdownElement.classList.toggle("opens-down", this.effectivePosition !== "top");
      var arrows = this.dropdownElement.querySelectorAll(".arrow-up, .arrow-down");
      for (var index = 0; index < arrows.length; index++) {
        arrows[index].classList.toggle("arrow-up", this.effectivePosition !== "top");
        arrows[index].classList.toggle("arrow-down", this.effectivePosition === "top");
      }
    }
  };

  global.StacklineMultiSelect = StacklineMultiSelect;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = StacklineMultiSelect;
  }
})(typeof window !== "undefined" ? window : globalThis);
