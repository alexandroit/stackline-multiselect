import StacklineMultiSelect, { createStacklineMultiSelectState } from "../..";

interface Option {
  id: string;
  label: string;
}

const options: Option[] = [{ id: "one", label: "One" }];
const instance = new StacklineMultiSelect<Option>(document.createElement("div"), {
  data: options,
  settings: { primaryKey: "id", labelKey: "label" }
});
const state = createStacklineMultiSelectState<Option>({ data: options });

instance.setSelected(state.data);
