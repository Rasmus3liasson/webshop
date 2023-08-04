import { headers } from "next/headers";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const headerList = headers();
  const host = headerList.get("host");

  try {
    const { data } = await request.json();

    const lineItems = data.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          /*           images: item.imageUrl, */
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    console.log(host);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",

      success_url: `${host}/order-confirmation?status=success`,
      cancel_url: `${host}/order-confirmation?status=declined`,
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
