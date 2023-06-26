import { ProductItemsInterface } from "@/types/items";
import { sizeComparator } from "./sortSizes";
import { config } from "dotenv";

config();

export async function getItemData() {
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST as string,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();

  // Filtering the necassary data I want
  const filteredData = data.results.map((item: ProductItemsInterface) => ({
    id: item.code,
    name: item.name,
    imagePoster: item.images[0].url,
    price: item.price.value,
    galleryImages: item.galleryImages,
    similarImages: item.allArticleBaseImages,
    clothingSizes: item.variantSizes
      .map((item) => item.filterCode)
      .sort(sizeComparator),
    itemColor: item.articles[0].color.text.toUpperCase().split("/")[0],
  }));

  return filteredData;
}
