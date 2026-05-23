(function (global) {
  "use strict";

  var DEFAULT_SETTINGS = {
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
    skin: "",
    disabled: false,
    groupBy: "",
    limitSelection: 0,
    lazyLoading: false
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

  function sameItem(a, b, idKey) {
    if (!a || !b) {
      return false;
    }
    if (a[idKey] != null && b[idKey] != null) {
      return String(a[idKey]) === String(b[idKey]);
    }
    return a === b;
  }

  function button(type, className, label) {
    var el = document.createElement("button");
    el.type = type || "button";
    el.className = className || "";
    el.innerHTML = label || "";
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
    this.root = null;

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    document.addEventListener("click", this.handleOutsideClick);
    this.render();
  }

  StacklineMultiSelect.prototype.destroy = function () {
    document.removeEventListener("click", this.handleOutsideClick);
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
    var classes = ["stackline-dropdown", "theme-" + theme];
    if (["classic", "material", "dark", "custom"].indexOf(theme) === -1) {
      classes.push("theme-custom");
    }
    if (this.isOpen) {
      classes.push("is-open");
    }
    if (this.settings.disabled) {
      classes.push("is-disabled");
    }
    return classes.join(" ");
  };

  StacklineMultiSelect.prototype.emit = function (name, payload) {
    if (typeof this.handlers[name] === "function") {
      this.handlers[name](payload, this);
    }
  };

  StacklineMultiSelect.prototype.render = function () {
    this.host.innerHTML = "";
    this.root = document.createElement("div");
    this.root.className = this.getDropdownClasses();
    this.root.appendChild(this.renderButton());
    this.root.appendChild(this.renderDropdown());
    this.host.appendChild(this.root);
  };

  StacklineMultiSelect.prototype.renderButton = function () {
    var wrapper = document.createElement("div");
    wrapper.className = "selected-list";

    var trigger = document.createElement("div");
    trigger.className = "c-btn" + (this.settings.disabled ? " disabled" : "") + (this.shouldShowClearAll() ? " has-clear" : "");
    trigger.setAttribute("role", "button");
    trigger.tabIndex = this.settings.disabled ? -1 : 0;
    trigger.setAttribute("aria-disabled", this.settings.disabled ? "true" : "false");
    trigger.setAttribute("aria-expanded", this.isOpen ? "true" : "false");
    trigger.addEventListener("click", this.toggleDropdown.bind(this));
    trigger.addEventListener("keydown", this.handleTriggerKeydown.bind(this));

    if (this.selectedItems.length === 0) {
      var placeholder = document.createElement("span");
      placeholder.className = "placeholder";
      placeholder.textContent = this.settings.text;
      trigger.appendChild(placeholder);
    } else if (this.settings.singleSelection) {
      var single = document.createElement("span");
      single.className = "single-label";
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

    var caret = document.createElement("span");
    caret.className = "fa " + (this.isOpen ? "fa-angle-up" : "fa-angle-down");
    caret.setAttribute("aria-hidden", "true");
    caret.textContent = this.isOpen ? "^" : "v";
    trigger.appendChild(caret);

    wrapper.appendChild(trigger);
    return wrapper;
  };

  StacklineMultiSelect.prototype.renderClearAllButton = function () {
    var clear = button("button", "fa fa-clear-all", "x");
    clear.disabled = !!this.settings.disabled;
    clear.setAttribute("aria-label", this.settings.clearAllText);
    clear.addEventListener("click", this.clearSelected.bind(this));
    return clear;
  };

  StacklineMultiSelect.prototype.renderTokens = function () {
    var list = document.createElement("div");
    list.className = "c-list";

    var limit = Number(this.settings.badgeShowLimit) || 0;
    var visible = this.selectedItems.slice(0, limit);

    for (var index = 0; index < visible.length; index++) {
      var item = visible[index];
      var token = document.createElement("span");
      token.className = "c-token";

      var label = document.createElement("span");
      label.className = "c-label";
      if (typeof this.badgeTemplate === "function") {
        renderTemplate(label, this.badgeTemplate, item);
      } else {
        label.textContent = this.itemLabel(item);
      }

      var remove = button("button", "fa fa-remove", "x");
      remove.disabled = !!this.settings.disabled;
      remove.setAttribute("aria-label", "Remove " + this.itemLabel(item));
      remove.addEventListener("click", this.removeItem.bind(this, item));

      token.appendChild(label);
      token.appendChild(remove);
      list.appendChild(token);
    }

    return list;
  };

  StacklineMultiSelect.prototype.renderDropdown = function () {
    var dropdown = document.createElement("div");
    dropdown.className = "dropdown-list";
    dropdown.hidden = !this.isOpen;

    var area = document.createElement("div");
    area.className = "list-area";

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
    var row = document.createElement("button");
    row.type = "button";
    row.className = "pure-checkbox select-all";
    row.innerHTML = this.allVisibleSelected()
      ? escapeHtml(this.settings.unSelectAllText)
      : escapeHtml(this.settings.selectAllText);
    row.addEventListener("click", this.toggleSelectAll.bind(this));
    return row;
  };

  StacklineMultiSelect.prototype.renderSearch = function () {
    var filter = document.createElement("label");
    filter.className = "list-filter";

    var icon = document.createElement("span");
    icon.className = "fa fa-search";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "";

    var input = document.createElement("input");
    input.type = "search";
    input.value = this.filter;
    input.placeholder = this.settings.searchPlaceholderText;
    input.addEventListener("input", this.handleFilter.bind(this));
    input.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    filter.appendChild(icon);
    filter.appendChild(input);
    return filter;
  };

  StacklineMultiSelect.prototype.renderOptions = function () {
    var filtered = this.filteredItems();
    var wrapper = document.createElement("div");
    wrapper.className = "options-shell";

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
    ul.style.maxHeight = Number(this.settings.maxHeight || 260) + "px";

    var items = this.itemsForRender(filtered);
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

    var groups = {};
    for (var index = 0; index < items.length; index++) {
      var item = items[index];
      var key = item[this.settings.groupBy] || "Outros";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    }

    for (var name in groups) {
      if (!Object.prototype.hasOwnProperty.call(groups, name)) {
        continue;
      }
      var group = document.createElement("ul");
      group.className = "list-grp";

      var title = document.createElement("h4");
      title.textContent = name;
      group.appendChild(title);

      var groupItems = this.itemsForRender(groups[name]);
      for (var itemIndex = 0; itemIndex < groupItems.length; itemIndex++) {
        group.appendChild(this.renderOption(groupItems[itemIndex]));
      }
      shell.appendChild(group);
    }

    return shell;
  };

  StacklineMultiSelect.prototype.renderOption = function (item) {
    var li = document.createElement("li");
    li.className = "pure-checkbox" + (this.isSelected(item) ? " selected" : "");
    li.addEventListener("click", this.toggleItem.bind(this, item));

    if (this.settings.showCheckbox) {
      var input = document.createElement("input");
      input.type = "checkbox";
      input.checked = this.isSelected(item);
      input.disabled = this.isLimitReached(item);
      input.tabIndex = -1;
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
    event.stopPropagation();
    if (this.settings.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    this.render();
    this.emit(this.isOpen ? "onOpen" : "onClose", this.getSelected());
  };

  StacklineMultiSelect.prototype.handleTriggerKeydown = function (event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    this.toggleDropdown(event);
  };

  StacklineMultiSelect.prototype.closeDropdown = function () {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.render();
    this.emit("onClose", this.getSelected());
  };

  StacklineMultiSelect.prototype.handleOutsideClick = function (event) {
    if (this.root && !this.root.contains(event.target)) {
      this.closeDropdown();
    }
  };

  StacklineMultiSelect.prototype.handleFilter = function (event) {
    this.filter = event.target.value;
    this.render();
    var input = this.root.querySelector(".list-filter input");
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };

  StacklineMultiSelect.prototype.toggleSelectAll = function (event) {
    event.stopPropagation();
    var items = this.filteredItems();

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
    this.emit("onChange", this.getSelected());
  };

  StacklineMultiSelect.prototype.toggleItem = function (item, event) {
    event.stopPropagation();
    if (this.isSelected(item)) {
      this.removeItem(item, event);
      return;
    }
    if (this.isLimitReached(item)) {
      return;
    }
    if (this.settings.singleSelection) {
      this.selectedItems = [item];
      this.isOpen = false;
    } else {
      this.selectedItems.push(item);
    }
    this.render();
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
    this.render();
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
    this.emit("onDeSelectAll", removed);
    this.emit("onChange", this.getSelected());
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
    return item && item[this.settings.labelKey] != null ? item[this.settings.labelKey] : "";
  };

  StacklineMultiSelect.prototype.filteredItems = function () {
    var query = this.filter.trim().toLowerCase();
    if (!query) {
      return this.data.slice();
    }
    return this.data.filter(function (item) {
      return this.itemLabel(item).toLowerCase().indexOf(query) !== -1;
    }, this);
  };

  StacklineMultiSelect.prototype.itemsForRender = function (items) {
    if (!this.settings.lazyLoading) {
      return items;
    }
    return items.slice(0, 40);
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

  global.StacklineMultiSelect = StacklineMultiSelect;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = StacklineMultiSelect;
  }
})(typeof window !== "undefined" ? window : globalThis);
