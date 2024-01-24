import { addNewOrder, getOrderData } from "@/app/utils/orderData";

export async function GET(_request: Request) {
  try {
    const orders: OrderWithProducts[] = await getOrderData();

    const responseData: ResponseData = {
      data: orders,
    };

    return new Response(JSON.stringify(responseData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    await addNewOrder(requestBody);

    return new Response(JSON.stringify({ message: "Order skapad" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Kunde inte hämta data" }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
}
