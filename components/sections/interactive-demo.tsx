"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const CHAT: { role: "client" | "ai"; id: string; content: React.ReactNode }[] =
  [
    {
      role: "client",
      id: "msg-1",
      content: "Hi",
    },
    {
      role: "ai",
      id: "msg-2",
      content: "Hello, how can I help you today?",
    },
    {
      role: "client",
      id: "msg-3",
      content:
        "Okay, I want to post all these invoices as Accounting Invoice in my tally's XYZ solutions. I want them to be posted for the date of 1st Feb 2026. Please read the skill carefully before posting. You can check the company details from tally.",
    },
    {
      role: "client",
      id: "msg-4",
      content:
        "📂 Folder upload: C:\\Users\\username\\.openclaw\\workspace\\XYZ Solutions",
    },
    {
      role: "ai",
      id: "msg-5",
      content: (
        <div className="space-y-2">
          <p>
            I’ll post these in{" "}
            <span className="font-semibold text-emerald-700">
              Accounting Invoice
            </span>{" "}
            mode for{" "}
            <span className="font-semibold text-emerald-700">
              XYZ solutions
            </span>{" "}
            with voucher date{" "}
            <span className="font-mono text-xs font-semibold text-emerald-700">
              2026/02/01
            </span>
            .
          </p>
          <p className="text-xs text-zinc-600">
            Using the extracted invoice numbers and totals from your PDFs. I’m
            using the existing ledgers in your company:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-600">
            <li>Ultratech Cement Limited</li>
            <li>Purchase @ 18%</li>
            <li>Input CGST @ 9%</li>
            <li>Input SGST @ 9%</li>
          </ul>
          <p className="text-xs text-zinc-600">
            With bill-wise references per invoice number.
          </p>
        </div>
      ),
    },
  ];

const AI_PHASES = [
  "Layout analysis",
  "Entity resolution",
  "Ledger mapping",
  "Voucher draft",
];

export function InteractiveDemo() {
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.2, once: false });

  /** 10-step loop: chat fills in, AI progresses, voucher appears, PDF pulse */
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!inView || reduce) {
      setTick(0);
      return;
    }
    const id = window.setInterval(() => {
      setTick((t) => (t + 1) % 10);
    }, 2000);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const messagesVisible = Math.min(CHAT.length, 1 + tick);
  const afterChat = tick >= 4;
  const activePhaseIdx = afterChat
    ? Math.min(tick - 4, AI_PHASES.length - 1)
    : -1;
  const allAiDone = tick >= 8;
  const showVoucher = tick >= 7;
  const exportFlash = tick === 9;

  return (
    <section
      id="demo"
      ref={rootRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-emerald-50/40 via-white to-violet-50/30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="emerald" className="mx-auto">
              Interactive preview
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              See the journey from WhatsApp to Tally — end to end
            </h2>
            <p className="mt-3 text-balance text-zinc-600">
              A live-feeling walkthrough of how AI Machines by Maxxit processes
              a real document on your hardware and hands you a ready-to-share
              PDF.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* WhatsApp column */}
          <Reveal delay={0.05}>
            <div className="flex h-[580px] flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.2)] lg:h-[680px]">
              <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-black ring-1 ring-zinc-200">
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900">
                    AI Agent by Maxxit
                  </div>
                  <div className="text-xs text-emerald-600">online</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#ECE5DD] p-4 custom-scrollbar">
                {CHAT.slice(0, messagesVisible).map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                      m.role === "client"
                        ? "ml-auto bg-[#DCF8C6] text-zinc-900"
                        : "mr-auto bg-white text-zinc-800",
                    )}
                  >
                    {m.content}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* AI column */}
          <Reveal delay={0.1}>
            <div className="flex h-[580px] flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.2)] lg:h-[680px]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-zinc-200">
                    <Image
                      src="/images/ai-agent.avif"
                      alt="AI agent"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-snug text-zinc-900">
                      <span className="block">AI Machines</span>
                      <span className="block text-xs font-medium text-zinc-600">
                        by Maxxit
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600 mt-2" />
                      Processing pipeline
                    </div>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {AI_PHASES.map((label, i) => {
                    const done = allAiDone || i < activePhaseIdx;
                    const active =
                      afterChat && !allAiDone && i === activePhaseIdx;
                    return (
                      <li
                        key={label}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-3 py-6 text-sm transition-colors",
                          done || active
                            ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
                            : "border-zinc-100 bg-zinc-50/50 text-zinc-500",
                        )}
                      >
                        <CheckCircle2
                          className={cn(
                            "h-4 w-4 shrink-0",
                            done
                              ? "text-emerald-600"
                              : active
                                ? "text-emerald-500"
                                : "text-zinc-300",
                          )}
                        />
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-medium text-zinc-600">
                  <span>Pipeline progress</span>
                  <span>
                    {Math.min(100, Math.round(((tick + 1) / 10) * 100))}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-emerald-500 to-violet-500"
                    initial={false}
                    animate={{
                      width: `${Math.min(100, ((tick + 1) / 10) * 100)}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 22,
                    }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                  On-device AI — WhatsApp as your front door, Tally as your
                  system of record. Your data stays on your machines.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Tally + PDF column */}
          <Reveal delay={0.15}>
            <div className="flex h-[580px] flex-col gap-4 sm:col-span-2 lg:col-span-1 lg:h-[680px]">
              <motion.div
                layout
                className={cn(
                  "flex-1 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.2)] transition-opacity duration-300",
                  showVoucher ? "opacity-100" : "opacity-55",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/tally-logo-black.svg"
                      alt="Tally"
                      width={56}
                      height={28}
                      className="h-6 w-auto object-contain"
                    />
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Voucher preview
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/15">
                    Purchase
                  </span>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-b border-zinc-100 py-3">
                    <dt className="text-zinc-500">Party</dt>
                    <dd className="text-right font-medium text-zinc-900">
                      XYZ Solutions{" "}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-zinc-100 py-3">
                    <dt className="text-zinc-500">Invoice no.</dt>
                    <dd className="font-medium text-zinc-900">2841</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-zinc-100 py-3">
                    <dt className="text-zinc-500">Taxable</dt>
                    <dd className="font-medium text-zinc-900">₹ 1,24,500.00</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-zinc-500">GST</dt>
                    <dd className="font-medium text-zinc-900">₹ 22,410.00</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.div
                className={cn(
                  "rounded-3xl border border-violet-200/80 bg-linear-to-br from-violet-50 to-white p-5 shadow-[0_18px_40px_-24px_rgba(91,33,182,0.35)]",
                  exportFlash && "ring-2 ring-emerald-400/70",
                )}
                animate={
                  reduce
                    ? undefined
                    : exportFlash
                      ? { scale: [1, 1.015, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: 0.42 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      Sales invoices — February (bulk export)
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">
                      Bulk PDF export enabled via our TDL add-on (Tally normally exports one PDF at a time).
                    </div>
                  </div>
                  <FileText className="h-8 w-8 shrink-0 text-violet-500" />
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="mt-4 w-full"
                >
                  Bulk Export PDFs
                </Button>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
