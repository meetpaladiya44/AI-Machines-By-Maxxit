import Image from "next/image";
import { MessageSquare, Shield, Reply, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { CLIENT_AGENT_VISUALS } from "@/lib/landing-images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    icon: Shield,
    title: "Client allowlist",
    desc: "Only approved phone numbers can send PDFs and images. Unknown contacts queue for your review.",
  },
  {
    icon: Reply,
    title: "Auto-acknowledgement",
    desc: "Clients receive a default reply: invoice received — your CA will process it shortly.",
  },
  {
    icon: MessageSquare,
    title: "Same review queue",
    desc: "Agent documents appear in your Bulk Upload workflow. They are not auto-posted to Tally.",
  },
];

type AgentVisual = (typeof CLIENT_AGENT_VISUALS)[keyof typeof CLIENT_AGENT_VISUALS];

function AgentScreenshotCard({
  visual,
  variant,
  className,
  priority = false,
}: {
  visual: AgentVisual;
  variant: "chat" | "viewer";
  className?: string;
  priority?: boolean;
}) {
  const isChat = variant === "chat";

  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_32px_70px_-24px_rgba(15,23,42,0.5)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2.5",
          isChat
            ? "border-zinc-800 bg-zinc-950"
            : "border-zinc-800/80 bg-zinc-900",
        )}
      >
        {isChat ? (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600/90 text-[10px] font-bold text-white">
              M
            </span>
            <span className="truncate text-xs font-semibold text-zinc-100">
              Agent by Maxxit
            </span>
            <span className="ml-auto text-[10px] text-emerald-400">online</span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden />
            <span className="ml-1 truncate text-[11px] text-zinc-400">
              invoice_G-207.pdf
            </span>
          </>
        )}
      </div>

      <div className="relative overflow-hidden bg-zinc-900">
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          priority={priority}
          className="h-auto w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <figcaption className="flex items-center justify-between gap-2 border-t border-zinc-800 bg-zinc-950 px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-300">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/25">
            {visual.step}
          </span>
          {visual.label}
        </span>
        {isChat ? (
          <Image
            src="/images/whatsapp.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 rounded-sm opacity-80"
            aria-hidden
          />
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-wider text-violet-300/80">
            PDF
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function ClientAgentVisual() {
  const { intake, invoiceFlow, generatedInvoice } = CLIENT_AGENT_VISUALS;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-emerald-200/50 via-white/40 to-violet-200/40 blur-2xl"
        aria-hidden
      />

      <div className="relative min-h-0 space-y-5 sm:space-y-6 lg:min-h-[620px] lg:space-y-0">
        <AgentScreenshotCard
          visual={intake}
          variant="chat"
          priority
          className="relative z-10 lg:absolute lg:left-0 lg:top-0 lg:w-[58%] lg:-rotate-2"
        />

        <AgentScreenshotCard
          visual={invoiceFlow}
          variant="chat"
          className="relative z-20 lg:absolute lg:right-0 lg:top-10 lg:w-[68%] lg:rotate-1"
        />

        <AgentScreenshotCard
          visual={generatedInvoice}
          variant="viewer"
          className="relative z-30 lg:absolute lg:bottom-0 lg:left-[10%] lg:w-[82%] lg:-rotate-1"
        />

        <div
          className="pointer-events-none absolute left-[28%] top-[34%] z-0 hidden text-emerald-500/40 lg:block"
          aria-hidden
        >
          <ArrowRight className="h-6 w-6 rotate-12" />
        </div>
        <div
          className="pointer-events-none absolute bottom-[38%] right-[18%] z-0 hidden text-violet-500/40 lg:block"
          aria-hidden
        >
          <ArrowRight className="h-6 w-6 -rotate-12" />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-muted lg:mt-8">
        Intake → on-demand invoice → GST PDF returned to the client
      </p>
    </div>
  );
}

export function ClientAgent() {
  return (
    <section id="client-agent" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Badge tone="zinc" className="w-fit">
              Optional intake channel
            </Badge>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
              Let clients send documents over WhatsApp — on your terms
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              For firms whose clients already use messaging, the Client Agent
              runs on your machine, links via QR code, and routes documents into
              the same review workspace as Bulk Upload.
            </p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink-primary">
                        {p.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {p.desc}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <Button href="#how-it-works" variant="secondary" size="md" className="mt-8">
              Learn about Agent
            </Button>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <ClientAgentVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}