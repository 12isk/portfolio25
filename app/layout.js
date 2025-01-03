// app/layout.js
import ClientLayout from "./clientLayout"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./css/globals.css";

export const metadata = {
  title: "12isk",
  description: "All-around creative specializing in web development, graphic design, 3D, and innovative digital experiences. Loves mixing art and tech to turn cool ideas into reality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/media/models/torus-knot2.glb" 
          as="fetch" 
          crossOrigin="anonymous"
          type="application/octet-stream" 
        />
      </head>
      <link 
        rel="icon" 
        href="/icon?<generated>" 
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>
        <SpeedInsights />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}