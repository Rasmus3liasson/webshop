import { getOrderData } from "@/app/utils/orderData";

export async function GET(
  _request: Request,
  { params }: { params: { costumerId: string } }
) {
  try {
    const orders: OrderWithProducts[] = await getOrderData();

    const customersOrders = orders.filter(
      (order) => order.customer_id === parseInt(params.costumerId)
    );

    if (customersOrders) {
      const responseData: ResponseData = {
        data: customersOrders,
      };

      return new Response(JSON.stringify(responseData), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Kunde inte hitta ordern" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
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
