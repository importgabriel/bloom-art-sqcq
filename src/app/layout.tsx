import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Full Bloom",
  description: "A beautiful animated flower built with pure HTML and CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
