"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { FEATURE_SCREENSHOTS } from "@/lib/landing-images";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: 1,
    label: "Receive",
    title: "Import documents via Bulk Upload",
    desc: "Drop PDFs, photos, or spreadsheets — or receive them through the optional Client Agent. Queue multiple files per company.",
    image: null,
  },
  {
    step: 2,
    label: "Read",
    title: "AI reads and classifies",
    desc: "Scanned PDFs, phone photos, and multi-page documents are classified as purchase, sales, or bank statement.",
    image: null,
  },
  {
    step: 3,
    label: "Extract",
    title: "Structured accounting fields extracted",
    desc: "Parties, dates, GSTIN, line items, tax splits, or bank transaction rows — voucher-ready data, not raw OCR text.",
    image: null,
  },
  {
    step: 4,
    label: "Match",
    title: "MCP tools query live Tally",
    desc: "Match party to ledger, stock items with HSN, detect owning company, and pull voucher template shape from Tally.",
    image: null,
  },
  {
    step: 5,
    label: "Review",
    title: "CA reviews side by side",
    desc: "Original document beside extracted fields. Edit party, items, ledgers, and tax. GSTIN mismatches and company guards flagged.",
    image: FEATURE_SCREENSHOTS.bulkUploadReview,
  },
  {
    step: 6,
    label: "Post",
    title: "One-click post to TallyPrime",
    desc: "Confirm and post. Voucher written to the correct company with traceable narration.",
    image: FEATURE_SCREENSHOTS.tallyPurchaseVoucher,
  },
  {
    step: 7,
    label: "Track",
    title: "Local history and dashboard",
    desc: "Posted vouchers recorded on your machine. Dashboard updates across companies; bank statements show per-line progress.",
    image: FEATURE_SCREENSHOTS.tallyLedgerVouchers,
  },
] as const;

export function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const step = STEPS[active];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="brand" className="mx-auto">
              End-to-end workflow
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Import → Extract → Review → Post
            </h2>
            <p className="mt-3 text-pretty text-ink-muted">
              Bulk Upload is step one — not a WhatsApp message. Human review is
              built in, not bolted on.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="space-y-2">
            {STEPS.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all",
                    isActive
                      ? "border-brand-green/30 bg-white shadow-md shadow-brand-green/10"
                      : "border-transparent bg-white/50 hover:border-border-subtle hover:bg-white"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      isActive
                        ? "bg-brand-green text-white"
                        : "bg-zinc-100 text-zinc-600"
                    )}
                  >
                    {s.step}
                  </span>
                  <span className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-base font-semibold text-ink-primary">
                      {s.title}
                    </span>
                    {isActive ? (
                      <span className="mt-1.5 block text-sm text-ink-muted">
                        {s.desc}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <Reveal key={step.label} direction="left">
            {step.image ? (
              <ScreenshotFrame
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                showBrowserChrome
                label={`Step ${step.step} — ${step.label}`}
              />
            ) : (
              <div className="flex h-full min-h-[320px] flex-col justify-center rounded-2xl border border-dashed border-border-subtle bg-white/80 p-8">
                <div className="text-5xl font-semibold text-brand-green/20">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.desc}
                </p>
              </div>
            )}
          </Reveal>
        </div>

        {!reduce ? (
          <p className="mt-6 text-center text-xs text-ink-muted">
            Select a step to explore the workflow
          </p>
        ) : null}
      </div>
    </section>
  );
}