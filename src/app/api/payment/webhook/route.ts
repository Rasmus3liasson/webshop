import { formatPrice, sendOrderToDatabase } from "@/app/utils/orderData";
import { NextResponse } from "next/server";

interface ProductItemsI {
  id: string;
  description: string;
  quantity: number;
  amount_total: number;
  amount_subtotal: number;
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    const session = event.data.object;
    const { id: session_id } = session;

    const sizes = session.metadata.size.split(",");
    const productIds = session.metadata.id.split(",");

    if (event.type === "checkout.session.completed") {
      const line_items = await stripe.checkout.sessions.listLineItems(
        session_id,
        {
          expand: ["data.price.product"],
        }
      );

      // Assign the result of map to a variable
      const products = line_items.data.map(
        (lineItem: ProductItemsI, index: number) => {
          const { id, description, quantity, amount_total, amount_subtotal } =
            lineItem;

          const productSize = sizes[index];
          const productId = productIds[index];

          return {
            order_detail_id: id,
            product_id: productId,
            product_name: description,
            quantity: quantity,
            product_size: productSize,
            product_price: Number(formatPrice(amount_total / quantity)),
            subtotal: Number(formatPrice(amount_subtotal)),
          };
        }
      );

      await sendOrderToDatabase({
        customer_email: session.customer_details.email,
        customer_address: session.customer_details.address.line1,
        customer_phone: session.customer_details.phone,
        products,
      });
      return NextResponse.json({ result: event, ok: true });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", ok: false });
  }
}
