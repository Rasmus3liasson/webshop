import { CartItemInterface } from "@/types/cart";

export const sendStripePayment = async (cart: CartItemInterface[]) => {
  try {
    const cartData = {
      data: cart,
    };

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!res.ok) {
      throw new Error("Kunde inte göra betalningen");
    }

    // Handle the response from the server and direct the user to new URL
    const { session } = await res.json();
    window.location.href = session.url;
  } catch (error) {
    console.error(error);
  }
};
