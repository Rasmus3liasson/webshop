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
