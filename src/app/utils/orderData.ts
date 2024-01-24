import { query } from "../../database/db";

export async function getOrderData() {
  try {
    // Destruct and gets first element of array
    const [data] = await query({
      query: "CALL GetOrders()",
    });
    return data.reduce((order: OrderWithProducts[], row: OrderRowsI) => {
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

      return order.sort((a, b) => a.order_id - b.order_id);
    }, []);
  } catch (error) {
    throw error;
  }
}
export async function addNewOrder(newOrder: OrderWithProducts) {
  try {
    // Convert products array into JSON
    const productsInJSON = JSON.stringify(newOrder.products);

    // Insert order details
    await query({
      query: "CALL CreateOrder(?, ?, ?, ?)",
      values: [
        newOrder.customer_email,
        newOrder.customer_address,
        newOrder.customer_phone,
        productsInJSON,
      ],
    });
  } catch (error) {
    throw error;
  }
}
