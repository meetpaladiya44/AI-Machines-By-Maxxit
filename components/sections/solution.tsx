import Image from "next/image";
import {
  Upload,
  ScanLine,
  ClipboardCheck,
  Send,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { GradientBlur } from "@/components/ui/gradient-blur";
import { BrandHighlight } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Upload,
    title: "Import documents",
    desc: "Bulk Upload PDFs, photos, Excel, CSV — or optional Client Agent intake.",
  },
  {
    icon: ScanLine,
    title: "AI reads & classifies",
    desc: "Purchase, sales, or bank statement — including scanned PDFs and phone photos.",
  },
  {
    icon: ClipboardCheck,
    title: "CA reviews side by side",
    desc: "Edit party, items, ledgers, tax — nothing auto-posted.",
  },
  {
    icon: Send,
    title: "One-click post to TallyPrime",
    desc: "Voucher written to the correct company with traceable narration.",
  }
];

const GLOW_ORB = "bg-emerald-500/15";

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden py-20 sm:py-24">
      <GradientBlur variant="soft" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              <BrandHighlight>An AI Companion</BrandHighlight> that does the repetitive extraction
            </h2>
            <p className="mt-3 text-pretty text-zinc-600">
              Runs on the CA&apos;s own computer. AI extracts voucher-ready data,
              MCP tools match live Tally masters, and you review everything
              before posting — financial documents stay on the local machine.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-200/40 via-violet-200/30 to-rose-200/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-zinc-950 p-3 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/maxxit-banner-image.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover opacity-50 blur-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                  <div
                    className="absolute inset-0 flex items-center justify-center pb-6 pt-10"
                    style={{
                      filter:
                        "drop-shadow(0 0 20px rgba(52,211,153,0.25)) drop-shadow(0 16px 32px rgba(0,0,0,0.4))",
                    }}
                  >
                    <div className="relative h-[78%] w-[70%] max-w-[360px]">
                      <Image
                        src="/images/desktop-setup.png"
                        alt="On-premises Maxxit Tally desktop setup"
                        fill
                        sizes="360px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-2 py-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-zinc-200">
                      Runs on your local system
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300/90">
                    Maxxit Tally · TallyPrime companion
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.05}>
            <ol className="relative space-y-5 lg:pl-2">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="list-none">
                    <Card
                      hover={false}
                      className="card-shine group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_22px_40px_-18px_rgba(0,204,106,0.12)]"
                    >
                      <div
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                          GLOW_ORB
                        )}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-emerald-500/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      <div className="relative flex items-start gap-4">
                        <div className="relative shrink-0">
                          <CardIcon
                            tone="emerald"
                            className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
                          >
                            <Icon className="h-5 w-5" />
                          </CardIcon>
                          <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold text-white">
                            {i + 1}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-zinc-900">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-600">{s.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}