import { getFilterData } from "@/app/utils/filterData";
import { filterMock } from "../../../../mockData/filter";

export async function GET(_request: Request) {
  try {
    let filterDataApi = await getFilterData();
    const filterData = filterDataApi || filterMock;

    return new Response(JSON.stringify(filterData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
