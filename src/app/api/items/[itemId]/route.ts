import { FilteredItemDataInterface } from "@/types/items";
import { getItemData } from "../../../utils/ItemData";

export async function GET(
  _request: Request,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;

  try {
    const dataFromApi = await getItemData();
    if (!dataFromApi) {
      return new Response(JSON.stringify({ error: "Ingen data från API" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const itemData: FilteredItemDataInterface[] = dataFromApi.productItems as FilteredItemDataInterface[];
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
