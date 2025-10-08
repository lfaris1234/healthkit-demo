// app/layout.tsx
import "./globals.css";
import { Poppins, Merriweather } from "next/font/google";
import Providers from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: ["500","600","700"], display: "swap", variable: "--font-sans" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["700","900"], display: "swap", variable: "--font-headline" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${merriweather.variable} font-sans bg-white text-slate-900 antialiased min-h-screen`}>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
