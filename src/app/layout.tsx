import { Montserrat } from "next/font/google";
import Header from "./components/Header/page";
import "./globals.css";
import Footer from "./components/Footer/page";
import { CartContextProvider } from "./utils/cartContext";

const monteserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Web Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${monteserrat.className} m-0 p-0 box-border h-screen flex flex-col bg-background scroll-smooth`}
      >
        <CartContextProvider>
          <>
            <Header />
            <main className="flex items-center justify-center flex-col">
              {children}
            </main>
            <Footer />
          </>
        </CartContextProvider>
      </body>
    </html>
  );
}
