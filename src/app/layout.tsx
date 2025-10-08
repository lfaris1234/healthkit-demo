import "./globals.css";
import { ReactNode } from "react";
// import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <AuthProvider>
          {/* <Header /> */}
          <main className="mx-auto w-full max-w-screen-sm px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
