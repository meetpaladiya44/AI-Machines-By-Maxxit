"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Calculator,
  Building2,
  BookOpen,
  Scale,
  Users,
} from "lucide-react";
import { Card, CardIcon } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { BrandHighlight, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const AUDIENCES = [
  {
    title: "CA Firms",
    desc: "Scale client load without proportionally scaling junior headcount for data entry.",
    icon: Briefcase,
    tone: "emerald" as const,
  },
  {
    title: "Practising Accountants",
    desc: "Cut repetitive voucher work; focus on review, advisory, and compliance.",
    icon: Calculator,
    tone: "sky" as const,
  },
  {
    title: "Bookkeeping Teams",
    desc: "Process higher document volume with the same team size.",
    icon: BookOpen,
    tone: "amber" as const,
  },
  {
    title: "Tax Consultants",
    desc: "Cleaner books mean smoother GST returns and filings.",
    icon: Scale,
    tone: "emerald" as const,
  },
  {
    title: "SME Finance Teams",
    desc: "Keep TallyPrime books current without a large back-office.",
    icon: Building2,
    tone: "zinc" as const,
  },
  {
    title: "Multi-Company Practices",
    desc: "Switch companies, route documents correctly, and track posts across clients.",
    icon: Users,
    tone: "sky" as const,
  },
];

const GLOW_ORB: Record<(typeof AUDIENCES)[number]["tone"], string> = {
  emerald: "bg-emerald-500/15",
  sky: "bg-sky-500/15",
  amber: "bg-amber-500/15",
  zinc: "bg-zinc-500/15",
};

export function IdealFor() {
  const reduceMotion = useReducedMotion();

  const plugins = React.useMemo(() => {
    if (reduceMotion === true) return [];
    return [
      AutoScroll({
        playOnInit: true,
        speed: 0.65,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ];
  }, [reduceMotion]);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    plugins
  );

  return (
    <section id="ideal-for" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading className="text-ink-primary">
              For accounting pros -{" "}
              <BrandHighlight>every team on the books</BrandHighlight>
            </SectionHeading>
            <p className="mt-3 text-pretty text-ink-muted">
              Whether you handle one Tally company or dozens, Maxxit Tally keeps
              document intake, review, and posting moving - on your premises, on
              your terms.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-surface-page to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-surface-page to-transparent sm:w-16"
            aria-hidden
          />

          <div
            className="overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
            ref={emblaRef}
          >
            <div className="flex -ml-5 cursor-grab touch-pan-y active:cursor-grabbing">
              {AUDIENCES.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="min-w-0 shrink-0 grow-0 basis-[280px] pl-5 sm:basis-[300px]"
                  >
                    <Card
                      hover={false}
                      className="card-shine group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_22px_40px_-18px_rgba(0,204,106,0.12)]"
                    >
                      <div
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                          GLOW_ORB[a.tone]
                        )}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-emerald-500/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      <CardIcon
                        tone={a.tone}
                        className="relative transition-transform duration-300 group-hover:scale-105"
                      >
                        <Icon className="h-5 w-5" />
                      </CardIcon>
                      <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-ink-primary">
                        {a.title}
                      </h3>
                      <p className="relative mt-1.5 text-sm text-ink-muted">
                        {a.desc}
                      </p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}