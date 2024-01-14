import { RowDataPacket } from "mysql2";
import { query } from "../../../database/db";

export default async function getOrderData() {
  const data = (await query({
    query: "SELECT * FROM all_orders",
  })) as RowDataPacket[];
  return data.reduce((order: OrderWithProducts[], row) => {
    const existingOrder = order.find((o) => o.order_id === row.order_id);

    if (existingOrder) {
      existingOrder.products.push({
        order_detail_id: row.order_detail_id,
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        product_price: row.product_price,
        subtotal: row.subtotal,
      });
    } else {
      const newOrder: OrderWithProducts = {
        order_id: row.order_id,
        order_date: row.order_date,
        customer_id: row.customer_id,
        customer_email: row.customer_email,
        customer_address: row.customer_address,
        customer_phone: row.customer_phone,
        products: [
          {
            order_detail_id: row.order_detail_id,
            product_id: row.product_id,
            product_name: row.product_name,
            quantity: row.quantity,
            product_price: row.product_price,
            subtotal: row.subtotal,
          },
        ],
      };

      order.push(newOrder);
    }

    return order;
  }, []);
}
