// app/layout.js
import ClientLayout from "./clientLayout"
import "./css/globals.css";

export const metadata = {
  title: "12isk",
  description: "12isk is a creative developer that specializes in web design and development.",
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
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}