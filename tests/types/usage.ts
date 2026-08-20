import StacklineMultiSelect = require("../..");

interface Country {
  id: number;
  itemName: string;
  region: string;
  disabled?: boolean;
}

const countries: Country[] = [
  { id: 1, itemName: "Brazil", region: "South America" },
  { id: 2, itemName: "Canada", region: "North America" }
];

const dropdown = new StacklineMultiSelect<Country>(document.createElement("div"), {
  data: countries,
  selected: [countries[0]],
  settings: {
    primaryKey: "id",
    labelKey: "itemName",
    groupBy: (country) => country.region,
    searchBy: ["itemName", "region"],
    keyboard: { arrows: true, escape: true }
  },
  renderItem: (country) => country.itemName,
  onChange: (selected, instance) => {
    selected[0].region.toUpperCase();
    instance.getSelected();
  }
});

dropdown.setSettings({ keyboard: { escape: false } });
dropdown.selectAll();
dropdown.getSelected()[0].itemName.toUpperCase();

const state = StacklineMultiSelect.createStacklineMultiSelectState<Country>({
  data: countries,
  settings: { primaryKey: "id", labelKey: "itemName", limitSelection: 1 },
  onUpdate: (nextState) => nextState.visibleOptions.length
});

state.toggleItem(countries[0]);
state.visibleOptions[0].item.region.toUpperCase();
state.getOptionProps(state.visibleOptions[0], { class: "country-option" });

const created = StacklineMultiSelect.create<Country>("#countries", { data: countries });
created.destroy();

const browserState = createStacklineMultiSelectState<Country>({ data: countries });
browserState.selectAll();
