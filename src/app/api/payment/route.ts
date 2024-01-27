import { headers } from "next/dist/client/components/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const metadata = {
      size: data.map((item: { size: string }) => item.size).toString(),
      id: data.map((item: { id: string }) => item.id).toString(),
    };

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
      metadata: metadata,
    });

    return new Response(JSON.stringify({ session }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      });
    } else {
      return new Response(JSON.stringify({ error: "Kunde inte hämta data" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }
  }
}
