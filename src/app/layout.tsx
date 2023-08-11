import { Montserrat } from "next/font/google";
import Header from "./components/Header/page";
import "./globals.css";
import Footer from "./components/Footer/page";
import { AccountContextProvider } from "./utils/firebase/accountContext";
import { CartContextProvider } from "./utils/cartContext";
import NextTopLoader from "nextjs-toploader";

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
