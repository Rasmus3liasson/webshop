export interface ProductItemsInterface {
  code: string;
  name: string;
  images: {
    url: string;
  }[];
  price: {
    value: number;
  };
  articles: {
    color: {
      text: string;
    };
  }[];
  galleryImages: {
    baseUrl: string;
  }[];
  allArticleBaseImages: string[];
  variantSizes: {
    filterCode: string;
  }[];
}

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
  itemColor: string;
  itemCategory: string;
}
[];

export interface FilterOptions {
  color: string[];
  categories: string[];
}

export interface FilteredProductData {
  productItems: FilteredItemDataInterface;
  filterOptions: FilterOptions;
}
