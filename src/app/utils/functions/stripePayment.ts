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

    // Handle the response from the server here
    const data = await res.json();
    // You can use 'data' to handle the response from the server after payment processing
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
