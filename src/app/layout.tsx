import { Montserrat } from "next/font/google";
import Header from "./components/Header/page";

import "./globals.css";
import Footer from "./components/Footer/page";
const monteserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Web Shop",
  description: "An online shop for all your needs",
  keywords: "web shop, online shop, products",
  author: "Rasmus Eliasson",
  date: "2023-05-20",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${monteserrat.className} m-0 p-0 box-border h-screen flex flex-col`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
