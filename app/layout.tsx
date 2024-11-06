import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { Providers } from "./Providers";
import '@rainbow-me/rainbowkit/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Faucet",
  description: "Premier Blockchain technology",
  authors: [{name: 'Verdansk', url:'https://github.com/nnoromiv'}],
  keywords: ['any', 'testnet', 'faucet', 'crypto', 'blockchain', 'ethereum'],
  publisher: 'Verdansk'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextUIProvider>
            <Providers>
              <Toaster position="bottom-right" richColors />
              {children}
            </Providers>
          </NextUIProvider>
        </body>
      </html>
  );
}
