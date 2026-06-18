"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { GET_STARTED_HREF, SIGN_IN_HREF } from "@/lib/site-links";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "How it works", href: "#data-flow" },
  { label: "Features", href: "#document-types" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 isolate w-full border-b transition-all duration-300",
        scrolled
          ? "border-border-subtle bg-white/90 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-surface-page/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Maxxit Tally System home"
        >
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href={SIGN_IN_HREF} variant="ghost" size="sm">
            Sign In
          </Button>
          <Button href={GET_STARTED_HREF} size="sm">
            Get Started
          </Button>
          <BookDemoButton size="sm" variant="secondary">
            Request a Demo
          </BookDemoButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border-subtle bg-white text-zinc-700 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border-subtle bg-white/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button href={SIGN_IN_HREF} variant="ghost" size="md">
                Sign In
              </Button>
              <Button href={GET_STARTED_HREF} size="md">
                Get Started
              </Button>
              <BookDemoButton size="md" variant="secondary">
                Request a Demo
              </BookDemoButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}