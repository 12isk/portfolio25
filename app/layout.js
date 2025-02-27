import { SpeedInsights } from "@vercel/speed-insights/next"

// app/layout.js
import ClientLayout from "./clientLayout"

import "./css/globals.css";

export const metadata = {
  title: "12isk",
  description: "All-around creative specializing in web development, graphic design, 3D, and innovative digital experiences. Loves mixing art and tech to turn cool ideas into reality.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ]
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link 
          rel="preload" 
          href="/fonts/Dirtyline.otf" 
          as="fetch" 
          crossOrigin="anonymous"
          type="application/octet-stream" 
        />
        <link 
          rel="preload" 
          href="/fonts/aston/AstonScriptBold-Bold.woff2" 
          as="fetch" 
          crossOrigin="anonymous"
          type="application/octet-stream" 
        />
        <link 
          rel="preload" 
          href="/fonts/nyghtserif/NyghtSerif-Dark.woff2" 
          as="fetch" 
          crossOrigin="anonymous"
          type="application/octet-stream" 
        />
        <link 
          rel="preload" 
          href="/fonts/satoshi/Satoshi-Black.woff2" 
          as="fetch" 
          crossOrigin="anonymous"
          type="application/octet-stream" 
        /> */}
        {/* <link rel="preload" href="/media/model-rec.webm" as="fetch" type="video/webm" /> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

      </head>
      {/* <link 
        rel="icon" 
        href="/icon?<generated>" 
        type="image/<generated>"
        sizes="<generated>"
      /> */}
      <body>
        <SpeedInsights />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}