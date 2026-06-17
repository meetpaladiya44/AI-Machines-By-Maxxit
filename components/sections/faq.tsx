"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does Maxxit Tally Software work?",
    a: "You import documents — purchase invoices, sales invoices, or bank statements — via Bulk Upload or optionally through the Client Agent. AI reads and extracts accounting fields. MCP tools match parties and ledgers against your live Tally data. You review everything in a structured workspace, then post to TallyPrime in one click.",
  },
  {
    q: "What document types are supported?",
    a: "Three core types: purchase invoices (Purchase vouchers), sales invoices (Sales vouchers), and bank statements (Payment, Receipt, and Contra vouchers line by line). Spreadsheet rows containing invoice or bank data are also supported.",
  },
  {
    q: "What file formats can I upload?",
    a: "PDF, JPG/JPEG, PNG, XLS, XLSX, and CSV. The Client Agent accepts PDFs and images via messaging.",
  },
  {
    q: "Does it work with TallyPrime?",
    a: "Yes. Maxxit Tally is built as a companion for TallyPrime. Open a company, enable connectivity, and the app connects automatically. Entries land with correct narration, ledger splits, taxes, and references.",
  },
  {
    q: "Is posting fully automatic?",
    a: "No — and that is intentional. Every voucher goes through a review workspace where you verify party, items, ledgers, and tax before posting. This matches how CAs already work — just much faster.",
  },
  {
    q: "How does bank statement processing work?",
    a: "Upload a bank statement. AI extracts all transaction rows with opening and closing balances. Each line is classified as Payment, Receipt, or Contra with a suggested ledger. You review, edit, skip, or post lines — with progress tracked per statement.",
  },
  {
    q: "Can CA firms manage multiple clients and companies?",
    a: "Yes. The app connects to all open Tally companies, auto-detects which company a document belongs to, and prevents cross-posting with company mismatch guards. The dashboard shows activity across all companies on your device.",
  },
  {
    q: "Where is my data stored?",
    a: "On your local computer. Uploaded files, extracted review data, and post history stay on your machine. Vouchers are posted to TallyPrime, which remains your system of record.",
  },
  {
    q: "What are MCP tools and why do they matter?",
    a: "MCP tools are the automation layer that connects AI extraction to your live Tally data. They look up ledgers, stock items, company details, and voucher templates in real time — so entries are built from your actual Tally configuration, not a generic template.",
  },
  {
    q: "Can clients send documents over WhatsApp?",
    a: "Yes, with the optional Client Agent. Install the background service, link your WhatsApp, and configure an allowlist of approved client numbers. Documents appear in your review queue — they are not auto-posted.",
  },
  {
    q: "How do firm teams work?",
    a: "Create a firm workspace, invite members by email, and assign roles: owner, admin, or member. Owners and admins manage the team; all roles can process documents and post to Tally.",
  },
  {
    q: "How is this different from cloud OCR tools?",
    a: "Cloud OCR tools upload your client documents to their servers. Maxxit Tally processes documents on your premises and posts directly to your local TallyPrime. Your data stays under your control.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <Badge tone="brand" className="mx-auto">
              FAQ
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Answers accounting leaders ask early
            </h2>
            <p className="mt-3 text-balance text-ink-muted">
              Still curious? Request a demo and bring your edge cases — we
              obsess over the long tail of vouchers.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.03}>
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-zinc-50/80"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-base font-semibold text-ink-primary">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0"
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
                      "border-t border-zinc-100 px-5 text-sm leading-relaxed text-ink-muted transition-[max-height,padding]",
                      isOpen ? "max-h-112 py-4" : "max-h-0 overflow-hidden py-0"
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