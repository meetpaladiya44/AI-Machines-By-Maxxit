import { TableProperties } from "lucide-react";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FileFormatFlow } from "@/components/ui/file-format-flow";
import { Card, CardIcon } from "@/components/ui/card";

const FORMAT_NOTES = [
  {
    title: "PDF and images",
    desc: "Scanned invoices, phone photos, and multi-page PDFs - including bank statements.",
  },
  {
    title: "Excel and CSV",
    desc: "Invoice lists and bank exports. AI detects column mapping and processes each row.",
  },
  {
    title: "Structured extraction",
    desc: "Fields are extracted into voucher-ready structure - party, GSTIN, line items, amounts.",
  },
];

export function FormatsSupport() {
  return (
    <section id="formats" className="relative border-y border-border-subtle/80 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
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

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-2xl border border-border-subtle bg-surface-page/50 px-6 py-10">
            <FileFormatFlow size="lg" />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {FORMAT_NOTES.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.05}>
              <Card className="h-full">
                <CardIcon tone="emerald">
                  <TableProperties className="h-5 w-5" />
                </CardIcon>
                <h3 className="mt-4 text-base font-semibold text-ink-primary">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{note.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}