import { itemsMock } from "../../../../mockData/items";
import { getItemData } from "../../utils/ItemData";

export async function GET(_request: Request) {
  try {
    const itemDataApi = await getItemData();
    const itemData = itemDataApi || itemsMock;

    return new Response(JSON.stringify(itemData), {
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
