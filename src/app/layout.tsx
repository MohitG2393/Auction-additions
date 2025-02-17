import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import "@knocklabs/react/dist/index.css";
import { AppKnockProviders } from "./knock-provider";
import { SessionProvider } from "next-auth/react";
import Footer from './footer'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Auctions",
  description: "by My Trading Kart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background flex-grow font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider>
          <AppKnockProviders>
            <Header />
            <div className="container mx-auto py-12">{children}</div>
          </AppKnockProviders>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
