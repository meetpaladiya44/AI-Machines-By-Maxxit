import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DemoModalProvider } from "@/components/ui/demo-modal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Maxxit Tally System — AI-powered entries for TallyPrime, on your premises",
  description:
    "Automate purchase, sales, and bank statement entries into TallyPrime. AI extracts documents locally, MCP tools match your ledgers, and you review every voucher before posting.",
  openGraph: {
    title: "Maxxit Tally System — Document to Tally in minutes",
    description:
      "On-premises accounting automation for CA firms. PDF, photos, Excel, and CSV — reviewed on your machine, posted to TallyPrime.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh bg-surface-page font-sans text-ink-primary antialiased">
        <DemoModalProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
        </DemoModalProvider>
      </body>
    </html>
  );
}