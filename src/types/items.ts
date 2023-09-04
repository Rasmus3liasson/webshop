export interface FilteredItemDataInterface {
  find(arg0: (item: { id: string }) => boolean): unknown;
  id: string;
  name: string;
  imagePoster: string;
  price: number;
  galleryImages: [
    {
      url: string;
      baseUrl: string;
    }
  ];
  similarImages: string[];
  clothingSizes: string[];
  itemColor: {
    text: string;
    code: string;
  };
  itemColorCode: string;
  itemCategory: string;
}

export interface SearchInputInterface {
  title: string;
  imagePoster: string;
}

export interface FilterOptions {
  color: { text: string; code: string }[];
  categories: string[];
}

export interface FilteredProductData {
  productItems: FilteredItemDataInterface[];
  filterOptions: FilterOptions;
}
