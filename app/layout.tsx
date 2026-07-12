import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "اطبعلي | صمم واطبع منتجك",
  description: "منصة عراقية للطباعة حسب الطلب",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
