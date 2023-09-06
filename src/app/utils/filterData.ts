import { config } from "dotenv";
import { filterMock } from "../../../mockData/filter";

config();

interface FilterValue {
  code: string;
  name: string;
  count: number;
}

interface FilterData {
  code: string;
  values: FilterValue[];
}

export async function getFilterData() {
  try {
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

    const filterData: FilterData[] = data.facets.filter(
      (filterData: FilterData) => {
        return (
          filterData.code === "colors" ||
          filterData.code === "colorWithNames" ||
          filterData.code === "productTypes"
        );
      }
    );

    //filter out the data that are empty
    const existingProducts = filterData.map((filter: FilterData) => {
      const filtered = filter.values.filter(
        (value: FilterValue) => value.count > 0
      );
      return { ...filter, values: filtered };
    });

    return existingProducts;
  } catch (error) {
    console.log("Error: " + error);
    return filterMock;
  }
}
