import * as React from "react";
import Image from "next/image";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  FileText,
  Brain,
  Database,
  Building2,
  BookOpen,
  FileOutput,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

type CardTone = NonNullable<ComponentProps<typeof CardIcon>["tone"]>;

type FeatureItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: CardTone;
  extra?: React.ReactNode;
};

const FEATURES: FeatureItem[] = [
  {
    title: "WhatsApp-first accounting workflow",
    desc: "Meet clients where they already share documents — no clunky portals or email threads.",
    icon: MessageSquare,
    tone: "emerald" as const,
  },
  {
    title: "PDF and image invoice reading",
    desc: "Scanned bills, phone photos, and multi-page PDFs are parsed with LLM-based document understanding.",
    icon: FileText,
    tone: "violet" as const,
  },
  {
    title: "AI-based data extraction",
    desc: "Line items, taxes, parties, and narration are understood in context — not just raw text.",
    icon: Brain,
    tone: "sky" as const,
  },
  {
    title: "Direct Tally integration",
    desc: "Post sales, purchase, payment, and journal vouchers where your books already live.",
    icon: Database,
    tone: "zinc" as const,
    extra: (
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2">
        <Image
          src="/images/tally-logo-black.svg"
          alt="Tally"
          width={52}
          height={24}
          className="h-5 w-auto object-contain opacity-90"
        />
        <span className="text-xs font-medium text-zinc-600">
          Native connector
        </span>
      </div>
    ),
  },
  {
    title: "Company-wise accounting entries",
    desc: "Route every document to the right company, books, and financial year automatically.",
    icon: Building2,
    tone: "amber" as const,
  },
  {
    title: "Ledger and voucher intelligence",
    desc: "Suggests ledgers, GST treatment, and voucher types based on history and document cues.",
    icon: BookOpen,
    tone: "rose" as const,
  },
  {
    title: "Auto-generated PDFs and reports",
    desc: "Export day books, party statements, and reconciliation packs — plus bulk sales-invoice PDFs via our TDL add-on (beyond Tally’s one-by-one export).",
    icon: FileOutput,
    tone: "violet" as const,
  },
  {
    title: "Faster processing, fewer mistakes",
    desc: "Replace repetitive keying with checks your team can scan in seconds — not hours.",
    icon: Zap,
    tone: "emerald" as const,
  },
  {
    title: "Secure document handling",
    desc: "Files are processed with company separation and access controls designed for firm workflows.",
    icon: Shield,
    tone: "sky" as const,
  },
  {
    title: "Built for CA firms and teams",
    desc: "Multi-user review, client tagging, and throughput that scales with your practice.",
    icon: Users,
    tone: "zinc" as const,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-linear-to-b from-violet-50/50 via-white to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="violet" className="mx-auto">
              Feature set
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Everything you need to run books at chat speed
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              AI Machines by Maxxit pairs a modern AI stack with the reliability of
              Tally — so your practice keeps the software you trust.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 4) * 0.04}>
                <Card>
                  <CardIcon tone={f.tone}>
                    <Icon className="h-5 w-5" />
                  </CardIcon>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-zinc-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {f.desc}
                  </p>
                  {f.extra}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
