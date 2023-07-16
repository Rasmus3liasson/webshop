import { config } from "dotenv";

config();

export async function getFilterData() {
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

  const filterData = data.facets.filter((filterData: any) => {
    return (
      filterData.code === "colors" ||
      filterData.code === "colorWithNames" ||
      filterData.code === "productTypes"
    );
  });

  //filter out the data that are empty
  const existingProducts = filterData.map((filter) => {
    const filtered = filter.values.filter((value) => value.count > 0);
    return { ...filter, values: filtered };
  });

  return existingProducts;
}
