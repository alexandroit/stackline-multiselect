export as namespace StacklineMultiSelect;

declare class StacklineMultiSelect<T = any> {
  constructor(target: string | Element, options?: StacklineMultiSelect.Options<T>);

  readonly host: Element;
  data: T[];
  selectedItems: T[];
  settings: StacklineMultiSelect.Settings<T>;
  isOpen: boolean;

  destroy(): void;
  setData(data: T[]): void;
  setSelected(items: T[]): void;
  setSettings(settings: StacklineMultiSelect.Settings<T>): void;
  setTheme(theme: string): void;
  getSelected(): T[];
  getThemeName(): string;
  openDropdown(): void;
  closeDropdown(restoreFocus?: boolean): void;
  open(): void;
  close(restoreFocus?: boolean): void;
  toggle(event?: Event): void;
  toggleItem(item: T, event?: Event): void;
  removeItem(item: T, event?: Event): void;
  clearSelected(event?: Event): void;
  clearSelection(event?: Event): void;
  clear(event?: Event): void;
  selectAll(event?: Event): void;
  deSelectAll(event?: Event): void;
  focusSearch(): void;
  isSelected(item: T): boolean;

  static create<T = any>(target: string | Element, options?: StacklineMultiSelect.Options<T>): StacklineMultiSelect<T>;
  static createState<T = any>(options?: StacklineMultiSelect.StateOptions<T>): StacklineMultiSelect.State<T>;
  static createMultiSelectState<T = any>(options?: StacklineMultiSelect.StateOptions<T>): StacklineMultiSelect.State<T>;
}

declare namespace StacklineMultiSelect {
  interface KeyboardSettings {
    space?: boolean;
    spaceOptionAction?: "toggle" | "toggle-and-next" | string;
    tab?: boolean;
    arrows?: boolean;
    escape?: boolean;
    backspace?: boolean;
    backspaceRemovesLastWhenSearchEmpty?: boolean;
    deleteRemovesFocusedBadge?: boolean;
  }

  interface Settings<T = any> {
    idKey?: string;
    primaryKey?: string;
    labelKey?: string;
    singleSelection?: boolean;
    text?: string;
    selectAllText?: string;
    unSelectAllText?: string;
    clearAllText?: string;
    enableCheckAll?: boolean;
    enableSearchFilter?: boolean;
    searchPlaceholderText?: string;
    badgeShowLimit?: number;
    showClearAll?: boolean;
    clearAll?: boolean;
    maxHeight?: number;
    showCheckbox?: boolean;
    noDataLabel?: string;
    theme?: string;
    skin?: string;
    disabled?: boolean;
    groupBy?: string | ((item: T) => any);
    limitSelection?: number;
    lazyLoading?: boolean;
    lazyPageSize?: number;
    closeDropDownOnSelection?: boolean;
    appendToBody?: boolean;
    tagToBody?: boolean;
    position?: "top" | "bottom";
    autoPosition?: boolean;
    searchBy?: string[];
    ariaLabel?: string;
    listboxAriaLabel?: string;
    searchAriaLabel?: string;
    clearSearchAriaLabel?: string;
    removeItemAriaLabel?: string;
    openDropdownAriaLabel?: string;
    closeDropdownAriaLabel?: string;
    loading?: boolean;
    loadingText?: string;
    keyboard?: KeyboardSettings;
  }

  type RenderContent = string | Node;
  type ItemRenderer<T> = (item: T) => RenderContent;

  interface EmptyContext<T = any> {
    query: string;
    settings: Settings<T>;
  }

  interface FooterContext<T = any> {
    selectedItems: T[];
    filteredItems: T[];
    settings: Settings<T>;
  }

  interface ScrollToEndPayload {
    rendered: number;
    total: number;
  }

  interface Options<T = any> {
    data?: T[];
    selected?: T[];
    settings?: Settings<T>;
    itemTemplate?: ItemRenderer<T>;
    renderItem?: ItemRenderer<T>;
    renderOption?: ItemRenderer<T>;
    badgeTemplate?: ItemRenderer<T>;
    renderBadge?: ItemRenderer<T>;
    emptyTemplate?: (context: EmptyContext<T>) => RenderContent;
    renderEmpty?: (context: EmptyContext<T>) => RenderContent;
    renderEmptyState?: (context: EmptyContext<T>) => RenderContent;
    footerTemplate?: (context: FooterContext<T>) => RenderContent;
    renderFooter?: (context: FooterContext<T>) => RenderContent;
    renderMenuFooter?: (context: FooterContext<T>) => RenderContent;
    onSelect?: (item: T, instance: StacklineMultiSelect<T>) => void;
    onDeSelect?: (item: T, instance: StacklineMultiSelect<T>) => void;
    onDeselect?: (item: T, instance: StacklineMultiSelect<T>) => void;
    onSelectAll?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onDeSelectAll?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onDeselectAll?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onChange?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onOpen?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onClose?: (items: T[], instance: StacklineMultiSelect<T>) => void;
    onScrollToEnd?: (payload: ScrollToEndPayload, instance: StacklineMultiSelect<T>) => void;
  }

  interface PropBag {
    [key: string]: any;
  }

  interface StateOption<T = any> {
    item: T;
    key: string;
    id: string;
    index: number;
    label: string;
    selected: boolean;
    disabled: boolean;
  }

  interface StateGroup<T = any> {
    name: string;
    items: StateOption<T>[];
    selected: boolean;
  }

  interface State<T = any> {
    readonly id: string;
    readonly listboxId: string;
    readonly settings: Settings<T>;
    readonly query: string;
    readonly isOpen: boolean;
    readonly selectedItems: T[];
    readonly data: T[];
    readonly label: string;
    readonly visibleOptions: StateOption<T>[];
    readonly groups: StateGroup<T>[];
    readonly visibleBadges: T[];
    readonly hiddenBadgeCount: number;
    readonly activeKey: string;
    getItemKey(item: T): string;
    getItemLabel(item: T): string;
    isSelected(item: T): boolean;
    setData(data: T[]): void;
    setSelected(items: T[]): void;
    setQuery(value: string): void;
    open(): void;
    close(): void;
    toggleOpen(): void;
    toggleItem(item: T): void;
    removeItem(item: T): void;
    clear(): void;
    clearAll(): void;
    selectAll(): void;
    deselectAll(): void;
    toggleGroup(groupName: any, items: T[]): void;
    getRootProps(extra?: PropBag): PropBag;
    getTriggerProps(extra?: PropBag): PropBag;
    getSearchInputProps(extra?: PropBag): PropBag;
    getListboxProps(extra?: PropBag): PropBag;
    getOptionProps(option: StateOption<T>, extra?: PropBag): PropBag;
    getRemoveButtonProps(item: T, extra?: PropBag): PropBag;
    getClearAllButtonProps(extra?: PropBag): PropBag;
  }

  interface StateOptions<T = any> {
    id?: string;
    data?: T[];
    selected?: T[];
    selectedItems?: T[];
    defaultSelectedItems?: T[];
    settings?: Settings<T>;
    onChange?: (items: T[], type: string, value: any, state: State<T>) => void;
    onSelect?: (item: T, state: State<T>) => void;
    onDeSelect?: (item: T, state: State<T>) => void;
    onDeselect?: (item: T, state: State<T>) => void;
    onUpdate?: (state: State<T>) => void;
  }

  function createStacklineMultiSelect<T = any>(target: string | Element, options?: Options<T>): StacklineMultiSelect<T>;
  function createStacklineMultiSelectState<T = any>(options?: StateOptions<T>): State<T>;
}

export = StacklineMultiSelect;

declare global {
  function createStacklineMultiSelect<T = any>(target: string | Element, options?: StacklineMultiSelect.Options<T>): StacklineMultiSelect<T>;
  function createStacklineMultiSelectState<T = any>(options?: StacklineMultiSelect.StateOptions<T>): StacklineMultiSelect.State<T>;
}
