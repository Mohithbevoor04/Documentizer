import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentChain AI — Blockchain & AI Talent Intelligence Platform",
  description: "AI-powered Blockchain Talent Intelligence Platform for Universities. Securely verify student credentials on Polygon, evaluate code quality, and connect candidates with corporate opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
