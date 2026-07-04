import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carbon Monoxide (CO) — Comprehensive Scientific Report",
  description:
    "An evidence-based interactive report on Carbon Monoxide: properties, health effects, diagnosis, treatment, and prevention. Featuring interactive charts, symptom explorer, and risk assessment tools.",
  keywords: [
    "carbon monoxide",
    "CO poisoning",
    "carboxyhemoglobin",
    "hyperbaric oxygen",
    "CO detection",
    "CO symptoms",
    "CO prevention",
  ],
  authors: [{ name: "CO Research Team" }],
  openGraph: {
    title: "Carbon Monoxide (CO) — Comprehensive Scientific Report",
    description:
      "An evidence-based interactive report on Carbon Monoxide: properties, health effects, diagnosis, treatment, and prevention.",
    siteName: "CO Scientific Report",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbon Monoxide (CO) — Comprehensive Scientific Report",
    description:
      "An evidence-based interactive report on Carbon Monoxide: properties, health effects, diagnosis, treatment, and prevention.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}