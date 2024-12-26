import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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
  title: "Desi Docs",
  description: "A modern desi document editor powered by Next.js - Write, format, and collaborate with a South Asian touch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Load jQuery before Summernote */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
