import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "../../../database/db";

export async function getOrderData() {
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
export async function addNewOrder(newOrder: OrderWithProducts) {

  // If the customer already exists, use the existing customer information
  await query({
    query:
      "INSERT IGNORE INTO customers (customer_id, email, address, phone_number) VALUES (?, ?, ?, ?)",
    values: [
      newOrder.customer_id,
      newOrder.customer_email,
      newOrder.customer_address,
      newOrder.customer_phone,
    ],
  });

  // Insert order and get the order id
  const orderIdResult = (await query({
    query: "INSERT INTO orders (customer_id) VALUES (?)",
    values: [newOrder.customer_id],
  })) as ResultSetHeader;

  const orderId = orderIdResult.insertId;

  // Insert order details
  for (const product of newOrder.products) {
    await query({
      query:
        "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      values: [
        orderId,
        product.product_id,
        product.quantity,
        product.product_price,
      ],
    });
  }
}
