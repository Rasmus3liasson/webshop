export interface ItemImagesInterface {
  url: string;
  baseUrl: string;
}
export interface uniqueItemInterface {
  id: string;
  name: string;
  imagePoster: string;
  price: number;
  galleryImages: ItemImagesInterface[];
  similarImages: string[];
  clothingSizes: string[];
  itemColor: string;
  itemCategory: string;
}
