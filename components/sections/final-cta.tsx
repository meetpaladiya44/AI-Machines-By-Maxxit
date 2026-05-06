import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/ui/book-demo-button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section id="cta" className="relative px-4 pb-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgba(16,185,129,0.45)] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Image
                  src="/images/maxxit-logo.png"
                  alt="Maxxit"
                  width={88}
                  height={24}
                  className="h-5 w-auto object-contain opacity-95"
                />
                <span className="text-zinc-200">AI Machines</span>
              </div>
            </div>
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to automate your accounting workflow?
            </h2>
            <p className="mt-4 text-balance text-base text-zinc-300 sm:text-lg">
              Book a walkthrough with our solutions team or start a WhatsApp pilot
              with one high-volume client to prove ROI in a week.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <BookDemoButton size="lg">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </BookDemoButton>
              <Button href="#demo" variant="whatsapp" size="lg" className="gap-2">
                <Image
                  src="/images/whatsapp.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-md object-cover"
                />
                Start with WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
