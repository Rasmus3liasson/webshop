export interface FilteredDataInterface {
  code: string;
  priority: number;
  category: boolean;
  multiSelect: boolean;
  visible: boolean;
  values: FilterValue[];
}

interface FilterValue {
  code: string;
  count: number;
  selected: boolean;
}

export interface ColorOptions {
  text: string;
  code: string;
}

export interface FilterOptionsInterface {
  color: ColorOptions[];
  categories: string[];
}
