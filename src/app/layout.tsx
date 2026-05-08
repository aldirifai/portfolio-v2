import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldirifai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhamad Aldi Rifai — Senior Backend Engineer",
    template: "%s — Aldi Rifai",
  },
  description:
    "Senior backend engineer with 5+ years building production systems in Laravel, expanding into Python, Go, and Rust. Indonesia-based, open to remote roles.",
  authors: [{ name: "Muhamad Aldi Rifai" }],
  creator: "Muhamad Aldi Rifai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "aldirifai.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aldirifai1999",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
