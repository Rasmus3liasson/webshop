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
  itemColorCode: string;
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
