import { getFilterData } from "@/app/utils/filterData";

export async function GET(_request: Request) {
  try {
    const filterData = await getFilterData();

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
