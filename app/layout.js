import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "12isk",
  description: "Coming soon! 🚀\n Lil surprise for you guys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
