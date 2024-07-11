import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "12isk Portfolio",
  description: "Coming soon!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./media/Logo-portfolio.png" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
