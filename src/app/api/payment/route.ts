import { headers } from "next/dist/client/components/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const headerList = headers();
    const domain = headerList.get("origin");

    const { data } = await request.json();

    const lineItems = data.map((item) => ({
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
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${domain}/order-confirmation?status=success`,
      cancel_url: `${domain}/order-confirmation?status=declined`,
    });

    return new Response(JSON.stringify({ session }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Felaktig" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
