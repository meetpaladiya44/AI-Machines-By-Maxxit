import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      // { label: "How it works", href: "#how-it-works" },
      // { label: "Features", href: "#features" },
      { label: "Interactive demo", href: "#demo" },
      { label: "Benefits", href: "#benefits" },
    ],
  },
  {
    title: "Built for",
    links: [
      { label: "CA firms", href: "#ideal-for" },
      { label: "Accountants", href: "#ideal-for" },
      { label: "SMEs", href: "#ideal-for" },
      { label: "Tax consultants", href: "#ideal-for" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Security", href: "#security" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Book a demo", href: "#cta" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-200/70 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
          <BrandLogo />
          <p className="mt-4 max-w-sm text-sm text-zinc-600">
            Automate accounting entries from WhatsApp to Tally with on-device
            AI. Built for CA firms and accounting teams who want data to stay on
            their machines.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold text-zinc-900">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} AI Machines by Maxxit. All rights
            reserved.
          </p>
          <p>
            Built with care for chartered accountants and finance teams in
            India.
          </p>
        </div>
      </div>
    </footer>
  );
}
