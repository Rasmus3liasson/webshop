import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Footer from "./components/Footer/page";
import Header from "./components/Header/page";
import "./globals.css";
import { CartContextProvider } from "./utils/cartContext";
import { AccountContextProvider } from "./utils/firebase/accountContext";

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
        className={`${monteserrat.className} m-0 p-0 box-border h-screen flex flex-col bg-background scroll-smooth overflow-x-hidden`}
      >
        <NextTopLoader
          color="#080707"
          showSpinner={false}
          easing="ease-in-out"
        />
        <CartContextProvider>
          <AccountContextProvider>
            <>
              <Header />
              <main className="flex items-center justify-center flex-col">
                {children}
              </main>
              <Footer />
            </>
          </AccountContextProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
