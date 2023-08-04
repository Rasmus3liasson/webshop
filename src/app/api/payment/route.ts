const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
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

    console.log(data.map((item) => item.imageUrl));
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel",
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
