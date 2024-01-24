import { formatPrice, sendOrderToDatabase } from "@/app/utils/orderData";
import { headers } from "next/dist/client/components/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface ProductDataI {
  name: string;
  price: number;
  quantity: number;
}

interface PriceData {
  product_data: {
    name: string;
  };
  unit_amount: number;
}

export async function POST(request: Request) {
  try {
    const headerList = headers();
    const domain = headerList.get("origin");

    const { data, email } = await request.json();

    const lineItems = data.map((item: StripPaymentInterface) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.imageUrl],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "SE"],
      },
      customer_email: email !== null ? email : "test@example.com",
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${domain}/order-confirmation?status=success`,
      cancel_url: `${domain}/order-confirmation?status=declined`,
    });

    const { customer_email, amount_total } = session;
    const products: ProductDataI[] = lineItems.map(
      ({
        price_data,
        quantity,
      }: {
        price_data: PriceData;
        quantity: number;
      }) => {
        const { name } = price_data.product_data;
        const price = price_data.unit_amount;

        return {
          name,
          price,
          quantity,
        };
      }
    );

    // Use the extracted information in the completeOrder object
    const completeOrder: OrderToDatabase = {
      customer_email,
      customer_address: "anders",
      customer_phone: "5559876543",
      products: products.map((product: ProductDataI, index: number) => ({
        order_detail_id: index + 1,
        product_id: index + 1,
        product_name: product.name,
        quantity: product.quantity,
        product_price: parseFloat(formatPrice(product.price)),
        subtotal: parseFloat(formatPrice(amount_total)),
      })),
    };

    await sendOrderToDatabase(completeOrder);

    return new Response(JSON.stringify({ session }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
