"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { FEATURE_SCREENSHOTS } from "@/lib/landing-images";

const BULLETS = [
  "Extract opening and closing balances with every transaction row",
  "Classify each line as Payment, Receipt, or Contra",
  "Suggest party ledgers from narration text",
  "Review, edit, skip, or post lines individually or in batch",
  "Track progress per statement: posted, pending, skipped",
];

const BANK_IMAGES = [
  {
    key: "review",
    fromLeft: true,
    screenshot: FEATURE_SCREENSHOTS.bankStatementReview,
    label: "Bank statement review",
  },
  {
    key: "table",
    fromLeft: true,
    screenshot: FEATURE_SCREENSHOTS.bankStatementTable,
    label: "Transaction table",
  },
  {
    key: "tally",
    fromLeft: false,
    screenshot: FEATURE_SCREENSHOTS.tallyLedgerVouchers,
    label: "Posted in TallyPrime",
  },
] as const;

export function BankStatements() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const imageRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (reduce) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        imageRefs.current.forEach((el, i) => {
          if (!el) return;

          const fromLeft = BANK_IMAGES[i].fromLeft;

          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: fromLeft ? -60 : 60,
              y: 30,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );

          const parallax = el.querySelector("[data-parallax]");
          if (parallax) {
            gsap.fromTo(
              parallax,
              { y: 16, scale: 1.03 },
              {
                y: -16,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.45,
                },
              },
            );
          }
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [reduce]);

  return (
    <section
      id="bank-statements"
      ref={sectionRef}
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            ref={(el) => {
              imageRefs.current[0] = el;
            }}
          >
            <div data-parallax>
              <ScreenshotFrame
                src={BANK_IMAGES[0].screenshot.src}
                alt={BANK_IMAGES[0].screenshot.alt}
                width={BANK_IMAGES[0].screenshot.width}
                height={BANK_IMAGES[0].screenshot.height}
                showBrowserChrome
                label={BANK_IMAGES[0].label}
              />
            </div>
          </div>

          <Reveal once={false}>
            <SectionHeading className="text-ink-primary">
              Bank statements -{" "}
              <BrandHighlight>line by line</BrandHighlight>
            </SectionHeading>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Upload a bank statement PDF, image, or spreadsheet. AI extracts
              every row; you review ledger assignments and post to Tally when
              ready - with per-statement completion status on your dashboard.
            </p>

            <ul className="mt-8 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div
            ref={(el) => {
              imageRefs.current[1] = el;
            }}
          >
            <div data-parallax>
              <ScreenshotFrame
                src={BANK_IMAGES[1].screenshot.src}
                alt={BANK_IMAGES[1].screenshot.alt}
                width={BANK_IMAGES[1].screenshot.width}
                height={BANK_IMAGES[1].screenshot.height}
                showBrowserChrome
                label={BANK_IMAGES[1].label}
              />
            </div>
          </div>

          <div className="hidden justify-center lg:flex" aria-hidden>
            <ArrowRight className="h-8 w-8 text-brand-green" />
          </div>

          <div
            ref={(el) => {
              imageRefs.current[2] = el;
            }}
          >
            <div data-parallax>
              <ScreenshotFrame
                src={BANK_IMAGES[2].screenshot.src}
                alt={BANK_IMAGES[2].screenshot.alt}
                width={BANK_IMAGES[2].screenshot.width}
                height={BANK_IMAGES[2].screenshot.height}
                showBrowserChrome
                label={BANK_IMAGES[2].label}
              />
            </div>
          </div>
        </div>

        <Reveal delay={0.12} once={false}>
          <p className="mt-8 text-center text-sm text-ink-muted">
            From bank PDF to Tally ledger vouchers - reviewed on your machine,
            posted with traceable narration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}