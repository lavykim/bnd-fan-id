import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BND Fan ID Maker",
  description: "A customizable BOYNEXTDOOR-inspired fan ID maker.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}