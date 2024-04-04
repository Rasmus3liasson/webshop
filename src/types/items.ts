export interface FilteredItemDataInterface {
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

export interface FilteredItemDataInterfaceFromHM
  extends FilteredItemDataInterface {
  itemColor: {
    text: string;
    code: string;
  };
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
  productItems: FilteredItemDataInterface[] | FilteredItemDataInterfaceFromHM[];
  filterOptions: FilterOptions;
}

export interface ItemInterface {
  code: string;
  name: string;
  articles: {
    color: {
      text: string;
      code: string;
    };
  }[];
  images: {
    url: string;
  }[];
  price: {
    value: number;
  };
  galleryImages: string;
  allArticleBaseImages: string;
  variantSizes: {
    filterCode: string;
  }[];
}
