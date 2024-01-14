import getOrderData from "@/app/utils/orderData";
import { RowDataPacket } from "mysql2";
import { query } from "../../../../database/db";

export async function GET(_request: Request) {
try {
    const result = await query({ query: "SELECT * FROM all_orders" }) as RowDataPacket[];
    const orders: OrderWithProducts[] = getOrderData(result);

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

