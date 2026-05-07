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
  title: "AI Machines by Maxxit — WhatsApp to Tally accounting automation",
  description:
    "Send invoices, PDFs, or images on WhatsApp. AI Machines by Maxxit reads them on your hardware and creates accurate accounting entries directly in Tally—then generates exportable PDFs and reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh font-sans antialiased">
        <DemoModalProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
        </DemoModalProvider>
      </body>
    </html>
  );
}

