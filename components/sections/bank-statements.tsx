import { ArrowRight, CheckCircle2 } from "lucide-react";
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

export function BankStatements() {
  return (
    <section id="bank-statements" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <ScreenshotFrame
              src={FEATURE_SCREENSHOTS.bankStatementReview.src}
              alt={FEATURE_SCREENSHOTS.bankStatementReview.alt}
              width={FEATURE_SCREENSHOTS.bankStatementReview.width}
              height={FEATURE_SCREENSHOTS.bankStatementReview.height}
              showBrowserChrome
              label="Bank statement review"
            />
          </Reveal>

          <Reveal>
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
          <Reveal delay={0.05}>
            <ScreenshotFrame
              src={FEATURE_SCREENSHOTS.bankStatementTable.src}
              alt={FEATURE_SCREENSHOTS.bankStatementTable.alt}
              width={FEATURE_SCREENSHOTS.bankStatementTable.width}
              height={FEATURE_SCREENSHOTS.bankStatementTable.height}
              showBrowserChrome
              label="Transaction table"
            />
          </Reveal>

          <div className="hidden justify-center lg:flex" aria-hidden>
            <ArrowRight className="h-8 w-8 text-brand-green" />
          </div>

          <Reveal delay={0.1}>
            <ScreenshotFrame
              src={FEATURE_SCREENSHOTS.tallyLedgerVouchers.src}
              alt={FEATURE_SCREENSHOTS.tallyLedgerVouchers.alt}
              width={FEATURE_SCREENSHOTS.tallyLedgerVouchers.width}
              height={FEATURE_SCREENSHOTS.tallyLedgerVouchers.height}
              showBrowserChrome
              label="Posted in TallyPrime"
            />
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 text-center text-sm text-ink-muted">
            From bank PDF to Tally ledger vouchers - reviewed on your machine,
            posted with traceable narration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}