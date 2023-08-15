import { itemsMock } from "../../../../mockData/items";
import { getItemData } from "../../utils/ItemData";

export async function GET(_request: Request) {
  try {
    const itemData = itemsMock;
    /* const itemData = await getItemData(); */
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
