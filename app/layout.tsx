import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Phòng Thí Nghiệm Ảo - Sinh Học",
  description: "Thí nghiệm ảo nhận biết các phân tử sinh học: đường khử, tinh bột, và protein",
  keywords: ["sinh học", "hóa học", "thí nghiệm", "Benedict", "Lugol", "Biuret"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
