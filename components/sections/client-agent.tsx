"use client";

import { MessageSquare, Shield, Reply } from "lucide-react";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { StackedScreenshotDeck } from "@/components/ui/stacked-screenshot-deck";
import { Button } from "@/components/ui/button";

const POINTS = [
  {
    icon: Shield,
    title: "Client allowlist",
    desc: "Only approved phone numbers can send PDFs and images. Unknown contacts queue for your review.",
  },
  {
    icon: Reply,
    title: "Auto-acknowledgement",
    desc: "Clients receive a default reply: invoice received - your CA will process it shortly.",
  },
  {
    icon: MessageSquare,
    title: "Same review queue",
    desc: "Agent documents appear in your Bulk Upload workflow. They are not auto-posted to Tally.",
  },
];

export function ClientAgent() {
  return (
    <section id="client-agent" className="relative overflow-x-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal once={false}>
            <SectionHeading className="text-ink-primary">
              Optional WhatsApp intake -{" "}
              <BrandHighlight>on your terms</BrandHighlight>
            </SectionHeading>
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

          <Reveal direction="left" delay={0.08} once={false}>
            <StackedScreenshotDeck />
          </Reveal>
        </div>
      </div>
    </section>
  );
}