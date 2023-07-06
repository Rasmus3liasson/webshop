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
  code: string;
  name: string;
  imagePoster: string;
  price: number;
  galleryImages: string[];
  similarImages: string[];
  clothingSizes: {
    filterCode: string;
  }[];
  itemColor: string;
}
[];
