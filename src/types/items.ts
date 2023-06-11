export interface ProductItemsInterface {
  name: string;
  images: {
    url: string;
  }[];
  price: {
    value: number;
  };
  galleryImages: {
    baseUrl: string;
  }[];
  allArticleBaseImages: string[];
}

export interface FilteredDataInterface {
  name: string;
  imagePoster: string;
  price: number;
  galleryImages: string[];
  similarImages: string[];
}
[];
