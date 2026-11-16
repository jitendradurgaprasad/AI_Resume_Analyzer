import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResuMatch — AI Resume Analyzer & ATS Score Intelligence",
  description: "Minimalist, enterprise-grade AI resume analyzer, ATS scoring simulator, and job description matcher by Medisetti Jitendra Durga Prasad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
