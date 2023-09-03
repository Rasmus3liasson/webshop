import { FilteredProductData } from "@/types/items";
import { getItemData } from "../../../utils/ItemData";
import { itemsMock } from "../../../../../mockData/items";

export async function GET(
  request: string,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;

  try {
    const dataFromApi: FilteredProductData = await getItemData();
    const itemData = dataFromApi.productItems || itemsMock.productItems;
    const uniqedItems = itemData.find(
      (item: { id: string }) => item.id === itemId
    );

    if (!uniqedItems) {
      return new Response(JSON.stringify({ error: "Kunde inte hitta varan" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(uniqedItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Routen fungerar inte" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
