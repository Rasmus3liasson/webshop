import { CartItemInterface } from "@/types/cart";

export const sendStripePayment = async (cart: CartItemInterface[]) => {
  let accountLocalStorage;
  if (typeof window !== "undefined") {
    accountLocalStorage = window.localStorage.getItem("user");
  }

  if (accountLocalStorage) {
    const parsedData = JSON.parse(accountLocalStorage);
    const {email} = parsedData || null;

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
