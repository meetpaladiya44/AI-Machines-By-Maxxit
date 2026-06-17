import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { FileFormatFlow } from "@/components/ui/file-format-flow";

export function TrustBar() {
  return (
    <section
      aria-label="Supported integrations and file formats"
      className="border-y border-border-subtle/80 bg-white/60 py-8 backdrop-blur-sm sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                Built for
              </span>
              <div className="inline-flex items-center gap-3 rounded-xl border border-border-subtle bg-white px-4 py-2.5 shadow-sm">
                <Image
                  src="/images/tally-logo-black.svg"
                  alt="TallyPrime"
                  width={56}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
                <span className="text-sm font-medium text-ink-primary">
                  TallyPrime companion
                </span>
              </div>
            </div>

            <FileFormatFlow size="sm" showCaption={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}