import { query } from "../../database/db";

export async function getOrderData() {
  // Destruct and gets first element of array
  const [data] = (await query({
    query: "CALL GetOrders()",
  }));
  return data.reduce((order: OrderWithProducts[], row: OrderRowsI ) => {
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
    query: "CALL CustomersAlreadyExist( ?, ?, ? , ?)",
    values: [
      newOrder.customer_id,
      newOrder.customer_email,
      newOrder.customer_address,
      newOrder.customer_phone,
    ],
  });

  // Insert order and get the order id
  const result = await query({
    query: "CALL InsertNewCustomer(?)",
    values: [newOrder.customer_id],
  });

  const orderId = result?.[0]?.[0]?.insertId;

  // Insert order details
  for (const product of newOrder.products) {
    await query({
      query: "CALL InsertProductDetails( ?, ?, ?, ?)",
      values: [
        orderId,
        product.product_id,
        product.quantity,
        product.product_price,
      ],
    });
  }
}
