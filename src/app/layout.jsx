
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";
import PostNav from "@/components/PostNav";



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased w-full h-screen font-poppins flex flex-col overflow-hidden`}
      >
        <StoreProvider>
          <Navbar />
          {/* Ensure children take remaining space & do not cause body scroll */}
          <div className="overflow-auto">
            {children}
          </div>
          <div className="lg:hidden ">
            <PostNav />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
