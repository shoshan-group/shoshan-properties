
import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const arabicFont = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSansArabic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

const englishFont = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-english",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SHOSHAN PROPERTIES | السوق العقاري",
    template: "%s | SHOSHAN PROPERTIES",
  },
  description:
    "منصة SHOSHAN PROPERTIES العقارية المتكاملة للبيع والإيجار والاستثمار العقاري.",
  applicationName: "SHOSHAN PROPERTIES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabicFont.variable} ${englishFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
