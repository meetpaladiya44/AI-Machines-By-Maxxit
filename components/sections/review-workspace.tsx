import {
  CheckCircle2,
  Pencil,
  ShieldAlert,
  Building2,
  Undo2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { FEATURE_SCREENSHOTS } from "@/lib/landing-images";

const CALLOUTS = [
  {
    icon: Pencil,
    title: "Editable everything",
    desc: "Party, items, quantities, rates, tax amounts, and ledger allocations - all editable before post.",
  },
  {
    icon: ShieldAlert,
    title: "GSTIN reconciliation",
    desc: "Invoice GSTIN vs ledger GSTIN flagged. You decide: update ledger, proceed, or dismiss.",
  },
  {
    icon: Building2,
    title: "Company matching guards",
    desc: "System detects document company and blocks posting if active Tally company does not match.",
  },
  {
    icon: Undo2,
    title: "Undo and redo",
    desc: "Review edits support undo/redo so corrections stay fast and reversible.",
  },
];

export function ReviewWorkspace() {
  const screenshot = FEATURE_SCREENSHOTS.bulkUploadReview;

  return (
    <section id="review-workspace" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-white via-surface-page to-surface-page" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge tone="brand" className="w-fit">
              Human-in-the-loop
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Review party, item, ledger, and tax details before posting to
              Tally
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Nothing is silently auto-posted. The review workspace shows your
              original document beside structured extracted fields - the same
              check you already do, in minutes instead of hours.
            </p>

            <ul className="mt-8 space-y-4">
              {CALLOUTS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink-primary">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {c.desc}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-green">
              <CheckCircle2 className="h-4 w-4" />
              One-click post to TallyPrime - after your review
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <ScreenshotFrame
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              showBrowserChrome
              label="Review workspace"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}