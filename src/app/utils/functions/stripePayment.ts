import { CartItemInterface } from "@/types/cart";

export const sendStripePayment = async (cart: CartItemInterface[]) => {
  let cartFromSessionStorage;
  if (typeof window !== "undefined") {
    cartFromSessionStorage = window.sessionStorage.getItem("cart");
  }

  if (cartFromSessionStorage) {
    const userFromLocalStorage = window.localStorage.getItem("user");
    const { email } = JSON.parse(userFromLocalStorage as string) || "";

    try {
      const cartData = {
        data: cart,
        email: email,
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

      // Handle the response from the server and direct the user to a new URL
      const { session } = await res.json();
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
  }
};
