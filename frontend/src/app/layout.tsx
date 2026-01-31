import "./styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Scheduler App",
  description: "Plan your schedule with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="felx-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
