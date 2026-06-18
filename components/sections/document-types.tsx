"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FileInput, ShoppingCart, Landmark } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { FEATURE_SCREENSHOTS } from "@/lib/landing-images";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";

const TYPES = [
  {
    id: "purchase",
    label: "Purchase",
    icon: ShoppingCart,
    title: "Purchase invoice extraction",
    desc: "Read vendor bills from PDFs, scans, or spreadsheets. Map to Sundry Creditor ledgers, split GST, and post Purchase vouchers after review.",
    href: "#review-workspace",
    image: FEATURE_SCREENSHOTS.purchaseInvoice,
    frameLabel: "Maxxit Tally - Purchase Invoice",
  },
  {
    id: "sales",
    label: "Sales",
    icon: FileInput,
    title: "Sales invoice extraction",
    desc: "Extract customer, items, taxes, and totals where your practice company is the seller. Build Sales vouchers with correct party and stock mapping.",
    href: "#review-workspace",
  },
  {
    id: "bank",
    label: "Bank Statements",
    icon: Landmark,
    title: "Bank statement processing",
    desc: "Extract every transaction row. Classify Payment, Receipt, and Contra lines, suggest ledgers from narration, and track progress per statement.",
    href: "#bank-statements",
    image: FEATURE_SCREENSHOTS.bankStatementReview,
    frameLabel: "Maxxit Tally - Bank Statement",
  },
] as const;

const ROTATION_ORDER = TYPES.map((type) => type.id);

export function DocumentTypes() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: false });
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<(typeof TYPES)[number]["id"]>("purchase");
  const current = TYPES.find((t) => t.id === active) ?? TYPES[0];

  React.useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    const id = window.setInterval(() => {
      setActive((currentId) => {
        const idx = ROTATION_ORDER.indexOf(currentId);
        return ROTATION_ORDER[(idx + 1) % ROTATION_ORDER.length];
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <section
      id="document-types"
      ref={rootRef}
      className="relative py-20 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-brand-green/5 via-surface-page to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              Core document types -{" "}
              <BrandHighlight>purchase, sales, bank</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Three headline workflows with equal weight - not an afterthought
              buried in a generic features list.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = active === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setActive(type.id)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand-green text-white shadow-md shadow-brand-green/25"
                    : "bg-white text-ink-muted ring-1 ring-border-subtle hover:text-ink-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink-primary">
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {current.desc}
              </p>
              <a
                href={current.href}
                className="mt-6 inline-flex text-sm font-semibold text-brand-green hover:text-brand-green-hover"
              >
                See how it works →
              </a>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.05}>
            <ScreenshotFrame
              src={
                "image" in current && current.image
                  ? current.image.src
                  : FEATURE_SCREENSHOTS.bulkUploadReview.src
              }
              alt={
                "image" in current && current.image
                  ? current.image.alt
                  : FEATURE_SCREENSHOTS.bulkUploadReview.alt
              }
              width={
                "image" in current && current.image
                  ? current.image.width
                  : FEATURE_SCREENSHOTS.bulkUploadReview.width
              }
              height={
                "image" in current && current.image
                  ? current.image.height
                  : FEATURE_SCREENSHOTS.bulkUploadReview.height
              }
              showBrowserChrome
              label={
                "frameLabel" in current && current.frameLabel
                  ? current.frameLabel
                  : "Maxxit Tally - Review Workspace"
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}