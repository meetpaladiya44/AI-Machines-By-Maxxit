"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does WhatsApp accounting automation work?",
    a: "Your clients send PDFs or photos through WhatsApp. AI Machines by Maxxit ingests those messages securely on your hardware, extracts voucher-ready data, and the connector posts drafts into your Tally company files. Approved vouchers sync instantly; exporters generate PDF summaries on demand.",
  },
  {
    q: "Does it support Tally?",
    a: "Yes — AI Machines by Maxxit is optimised for practitioners who rely on TallyPrime (or ERP 9 setups still in-market). Entries land with the narration, ledger splits, taxes, and supporting references your books expect.",
  },
  {
    q: "Can it read PDFs and images?",
    a: "Both. LLM-based document understanding handles scans and phone photos, and understands invoices, receipts, debit notes, and multi-page attachments so you rarely retype descriptions.",
  },
  {
    q: "Can CA firms manage multiple clients?",
    a: "Each client workspace keeps routing rules separate. Permissions control which staff can approve or post vouchers, letting partners scale without risking cross-posting.",
  },
  {
    q: "Is manual review possible?",
    a: "Absolutely. Review queues flag low-confidence fields, highlight discrepancies, and let senior staff accept, edit, or reject before anything becomes final in Tally.",
  },
  {
    q: "What kind of documents can be processed?",
    a: "Sales and purchase invoices, expense bills, debit/credit notes, bank advice scans, petty cash slips, GST summaries, and consolidated statements commonly seen in SME finance inboxes.",
  },
  {
    q: "Can reports be exported as PDFs?",
    a: "Yes — once vouchers are validated you can export registers, party ledgers, and management packs to branded PDFs. For sales invoices specifically, we also support bulk PDF exports via our TDL add-on (Tally’s default export is typically one PDF at a time).",
  },
  {
    q: "Can I export multiple sales invoice PDFs in bulk?",
    a: "Yes. We built a Tally add-on in TDL (Tally Definition Language) that enables bulk sales-invoice PDF exports — ideal for month-end packs, audit requests, and client sharing without exporting invoices one by one.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <Badge tone="violet" className="mx-auto">
              FAQ
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Answers accounting leaders ask early
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              Still curious? Bring your edge cases to a demo — we obsess over the
              long tail of vouchers.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-50/80"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-base font-semibold text-zinc-900">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    aria-hidden={!isOpen}
                    className={cn(
                      "border-t border-zinc-100 px-5 text-sm leading-relaxed text-zinc-600 transition-[max-height,padding]",
                      isOpen ? "max-h-112 py-4" : "max-h-0 overflow-hidden py-0",
                    )}
                  >
                    {item.a}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
