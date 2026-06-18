import { FileImage, Sheet, Braces } from "lucide-react";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FileFormatFlow } from "@/components/ui/file-format-flow";
import { Card } from "@/components/ui/card";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

const FORMAT_NOTES = [
  {
    title: "PDF and images",
    desc: "Scanned invoices, phone photos, and multi-page PDFs - including bank statements.",
    icon: FileImage,
    accent: "rose" as const,
    visual: "papers" as const,
  },
  {
    title: "Excel and CSV",
    desc: "Invoice lists and bank exports. AI detects column mapping and processes each row.",
    icon: Sheet,
    accent: "sky" as const,
    visual: "grid" as const,
  },
  {
    title: "Structured extraction",
    desc: "Fields are extracted into voucher-ready structure - party, GSTIN, line items, amounts.",
    icon: Braces,
    accent: "emerald" as const,
    visual: "json" as const,
  },
];

const ACCENT_RING: Record<(typeof FORMAT_NOTES)[number]["accent"], string> = {
  rose: "ring-rose-500/20 group-hover:ring-rose-500/35",
  sky: "ring-sky-500/20 group-hover:ring-sky-500/35",
  emerald: "ring-brand-green/20 group-hover:ring-brand-green/35",
};

const ACCENT_GLOW: Record<(typeof FORMAT_NOTES)[number]["accent"], string> = {
  rose: "from-rose-500/10",
  sky: "from-sky-500/10",
  emerald: "from-brand-green/10",
};

function FormatVisual({ type }: { type: (typeof FORMAT_NOTES)[number]["visual"] }) {
  if (type === "papers") {
    return (
      <div className="relative mx-auto h-28 w-32 sm:mx-0">
        <div className="absolute inset-x-3 top-2 h-20 rotate-[-4deg] rounded-lg border border-rose-200/80 bg-white shadow-sm" />
        <div className="absolute inset-x-5 top-4 h-20 rotate-[2deg] rounded-lg border border-rose-200/60 bg-rose-50/80 shadow-sm" />
        <div className="absolute inset-x-2 top-6 h-20 rounded-lg border border-rose-300/70 bg-white shadow-md">
          <div className="space-y-2 p-3">
            <div className="h-1.5 w-3/4 rounded-full bg-rose-200/80" />
            <div className="h-1.5 w-full rounded-full bg-zinc-200/80" />
            <div className="h-1.5 w-5/6 rounded-full bg-zinc-200/60" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="mx-auto w-32 overflow-hidden rounded-lg border border-sky-200/80 bg-white shadow-sm sm:mx-0">
        <div className="grid grid-cols-4 border-b border-sky-200/60 bg-sky-50/90">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="h-5 border-r border-sky-200/40 last:border-r-0"
            />
          ))}
        </div>
        <div className="grid grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`c-${i}`}
              className={cn(
                "h-4 border-b border-r border-sky-100/80 last:border-r-0",
                i % 4 === 0 && "bg-sky-50/50"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-28 w-32 items-center justify-center sm:mx-0">
      <span
        aria-hidden
        className="pointer-events-none absolute text-6xl font-bold text-brand-green/10"
      >
        {"{ }"}
      </span>
      <div className="relative w-full space-y-2 rounded-lg border border-brand-green/25 bg-brand-green/5 p-3 font-mono text-[10px] leading-relaxed text-brand-green/80">
        <div>{'"party": "Acme Ltd"'}</div>
        <div>{'"gstin": "27AAAA..."'}</div>
        <div className="h-1 w-full rounded-full bg-brand-green/20" />
        <div>{'"amount": 12450'}</div>
      </div>
    </div>
  );
}

export function FormatsSupport() {
  return (
    <section
      id="formats"
      className="relative border-y border-border-subtle/80 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal once={false}>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              Supported formats -{" "}
              <BrandHighlight>PDF, photos, Excel</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Works with the formats your clients already send. No reformatting
              required.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} once={false}>
          <div className="pipeline-glow-border mt-10">
            <div className="pipeline-glow-inner relative overflow-hidden bg-surface-page/80 px-6 py-10">
              <GridPattern className="text-zinc-300/50" size={28} />
              <div className="relative">
                <FileFormatFlow size="lg" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {FORMAT_NOTES.map((note, i) => {
            const Icon = note.icon;
            const direction = i % 2 === 0 ? "left" : "right";

            return (
              <Reveal key={note.title} delay={i * 0.05} direction={direction} once={false}>
                <Card
                  className={cn(
                    "group relative h-full overflow-hidden ring-1 transition-all duration-300",
                    ACCENT_RING[note.accent]
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent opacity-60",
                      ACCENT_GLOW[note.accent]
                    )}
                  />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    <FormatVisual type={note.visual} />
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-inset ring-zinc-200/80">
                        <Icon className="h-5 w-5 text-ink-primary" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-ink-primary">
                        {note.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {note.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}