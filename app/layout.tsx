import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/ui/nav/nav";

export const metadata: Metadata = {
  title: "League Management",
  description: "Recreational Sports League Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
