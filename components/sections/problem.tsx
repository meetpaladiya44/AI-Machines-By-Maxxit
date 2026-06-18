import {
  AlertTriangle,
  Clock,
  FileX,
  AlertCircle,
  TrendingDown,
  Landmark,
  CloudOff,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Manual entry eats the day",
    desc: "Hours spent retyping invoices, GST splits, and ledgers into Tally - every week.",
  },
  {
    icon: FileX,
    title: "Client documents get lost",
    desc: "Bills over WhatsApp or email slip through; juniors chase files instead of books.",
  },
  {
    icon: Landmark,
    title: "Bank statements consume mornings",
    desc: "Hundreds of lines per PDF - voucher type, party, reference - one statement, one morning.",
  },
  {
    icon: AlertCircle,
    title: "Human errors compound",
    desc: "Wrong amounts, ledgers, or GST rates - fixes cost more than getting it right first.",
  },
  {
    icon: CloudOff,
    title: "Cloud tools create trust friction",
    desc: "Many CAs won't upload client financials to third-party servers.",
  },
  {
    icon: TrendingDown,
    title: "Hard to scale without hiring",
    desc: "More clients traditionally means more juniors for data entry.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-linear-to-b from-rose-50/40 via-surface-page to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              The accounting bottleneck -{" "}
              <BrandHighlight>manual entry taxes every firm</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Firms lose time to retyping - not to lack of skill.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.04}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <CardIcon tone="rose">
                        <Icon className="h-5 w-5" />
                      </CardIcon>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-ink-primary">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-muted">{p.desc}</p>
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