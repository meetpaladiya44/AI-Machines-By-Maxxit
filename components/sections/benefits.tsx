import { Check, X } from "lucide-react";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const ROWS = [
  {
    dimension: "Document reading",
    manual: "CA reads PDF, types fields",
    maxxit: "AI extracts all fields automatically",
  },
  {
    dimension: "Ledger lookup",
    manual: "CA searches Tally manually",
    maxxit: "MCP tools match against live masters",
  },
  {
    dimension: "Bank statements",
    manual: "Line-by-line typing",
    maxxit: "Bulk extraction with per-line review",
  },
  {
    dimension: "Spreadsheets",
    manual: "Copy-paste row by row",
    maxxit: "AI column mapping, row-wise processing",
  },
  {
    dimension: "Company routing",
    manual: "CA must notice wrong company",
    maxxit: "Auto-detection with mismatch guards",
  },
  {
    dimension: "GSTIN checks",
    manual: "CA compares manually",
    maxxit: "System flags mismatches before post",
  },
  {
    dimension: "Client document intake",
    manual: "Email and WhatsApp chaos",
    maxxit: "Structured queue with optional Agent",
  },
  {
    dimension: "Posting",
    manual: "Create voucher in Tally GUI",
    maxxit: "One-click post after review",
  },
  {
    dimension: "Data location",
    manual: "Cloud OCR uploads client files",
    maxxit: "On-premises - documents stay local",
  },
];

export function Benefits() {
  return (
    <section id="differentiators" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-balance text-ink-primary">
              Why Maxxit -{" "}
              <BrandHighlight>minutes per document</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-balance text-ink-muted">
              The on-premises alternative to cloud OCR and unattended automation.
              Faster than typing. More controlled than auto-posting.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-border-subtle bg-surface-page/80 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-muted sm:px-6 sm:text-sm">
              <span>Dimension</span>
              <span className="flex items-center gap-1.5">
                <X className="h-3.5 w-3.5 text-rose-500" />
                Manual entry
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-green" />
                Maxxit Tally
              </span>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.dimension}
                className={cn(
                  "grid grid-cols-[1.1fr_1fr_1fr] gap-2 px-4 py-4 text-sm sm:px-6",
                  i < ROWS.length - 1 && "border-b border-border-subtle/80"
                )}
              >
                <span className="font-medium text-ink-primary">
                  {row.dimension}
                </span>
                <span className="text-ink-muted">{row.manual}</span>
                <span className="text-ink-primary">{row.maxxit}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}