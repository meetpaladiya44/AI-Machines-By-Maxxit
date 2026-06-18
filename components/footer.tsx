"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { GET_STARTED_HREF } from "@/lib/site-links";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#data-flow" },
      { label: "Features", href: "#document-types" },
      { label: "Bank statements", href: "#bank-statements" },
      { label: "Agentic flow", href: "#demo" },
    ],
  },
  {
    title: "Built for",
    links: [
      { label: "CA firms", href: "#ideal-for" },
      { label: "Accountants", href: "#ideal-for" },
      { label: "Bookkeeping teams", href: "#ideal-for" },
      { label: "Tax consultants", href: "#ideal-for" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Security", href: "#security" },
      { label: "Client Agent", href: "#client-agent" },
      { label: "Request a demo", href: "#cta", demo: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
          <BrandLogo />
          <p className="mt-4 max-w-sm text-sm text-ink-muted">
            On-premises accounting automation for TallyPrime. AI extracts
            documents on your machine, MCP tools match your ledgers, and you
            review every voucher before posting.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button href={GET_STARTED_HREF} size="sm">
              Get Started
            </Button>
            <BookDemoButton size="sm" variant="secondary">
              Request a Demo
            </BookDemoButton>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold text-ink-primary">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"demo" in l && l.demo ? (
                    <BookDemoButton
                      size="sm"
                      variant="ghost"
                      className="h-auto px-0 py-0 text-sm font-normal text-ink-muted hover:bg-transparent hover:text-ink-primary"
                    >
                      {l.label}
                    </BookDemoButton>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink-primary"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Maxxit Tally Software. All
            rights reserved.
          </p>
          <p>Built for chartered accountants and finance teams in India.</p>
        </div>
      </div>
    </footer>
  );
}