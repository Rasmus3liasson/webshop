import {
  FilterOptions,
  FilteredItemDataInterface,
  FilteredProductData,
} from "@/types/items";
import { sizeComparator } from "./functions/sortSizes";
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

  // removes duplicate values from array
  function removeDuplicateVaules(array: string[]) {
    const uniqueValues = array.filter((value, index) => {
      return array.indexOf(value) === index;
    });
    return uniqueValues;
  }

  // Filtering the necassary data I want
  const filteredItemData: FilteredItemDataInterface[] = data.results.map(
    (item: any) => {
      const itemColorText = item.articles[0].color.text
        .toUpperCase()
        .split("/")[0];
      const itemColorCode = item.articles[0].color.code;

      return {
        id: item.code,
        name: item.name,
        imagePoster: item.images[0].url,
        price: item.price.value,
        galleryImages: item.galleryImages,
        similarImages: item.allArticleBaseImages,
        clothingSizes: item.variantSizes
          .map((item: { filterCode: string }) => item.filterCode)
          .sort(sizeComparator),

        itemColor: {
          text: itemColorText,
          code: itemColorCode,
        },
        itemColorCode: itemColorCode,
        itemCategory: item.name.split(" ").slice(-1).toString().toUpperCase(),
      };
    }
  );

  const colorOptions = data.results.map(
    (item: { articles: { color: { text: string } }[] }) =>
      item.articles[0].color.text.toUpperCase().split("/")[0]
  );
  const uniqueColorOptions = removeDuplicateVaules(colorOptions);

  const filterOptions: FilterOptions = {
    color: uniqueColorOptions.map((color) => ({
      text: color,
      code:
        filteredItemData.find(
          (item) => item.itemColor.text.toUpperCase().split("/")[0] === color
        )?.itemColor.code ?? "",
    })),
    categories: removeDuplicateVaules(
      data.results.map((item: { name: string }) =>
        item.name.split(" ").slice(-1).toString().toUpperCase()
      )
    ),
  };

  const productData: FilteredProductData = {
    productItems: filteredItemData,
    filterOptions: filterOptions,
  };

  return productData;
}
