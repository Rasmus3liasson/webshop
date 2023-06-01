import { Montserrat } from "next/font/google";
import Header from "./components/Header/page";
import "./globals.css";
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
      <body className={`${monteserrat.className} m-0 p-0 box-border`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
