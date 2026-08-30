import { ArrowUpRight } from "lucide-react";
import { waitlist, site } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { LocationMap } from "@/components/waitlist/LocationMap";

export function Waitlist() {
  return (
    <Section id="waitlist">
      <Container>
        <Reveal>
          <article className="grid grid-cols-1 overflow-hidden rounded-[2px] border border-hairline bg-night lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-[2px] border border-brand/40 bg-brand/10 px-2.5 py-1 t-small text-brand">
                  {waitlist.perkShort}
                </span>
                <h2 className="t-h3 max-w-[16ch]">{waitlist.title}</h2>
                <p className="t-body max-w-[46ch] text-muted-foreground">{waitlist.paragraph}</p>
              </div>
              <WaitlistForm />
            </div>

            {/* Interactive dark map */}
            <div className="relative isolate min-h-[320px] border-t border-hairline lg:min-h-[440px] lg:border-l lg:border-t-0">
              <LocationMap />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 top-4 z-[1000] inline-flex items-center gap-1.5 rounded-[2px] border border-hairline bg-night/90 px-3 py-2 t-small text-foreground backdrop-blur-sm transition-colors duration-200 ease-brand hover:border-brand hover:text-brand"
              >
                Open in Maps
                <ArrowUpRight className="size-3.5" />
              </a>
              <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] flex flex-col gap-0.5">
                <span className="t-small font-semibold text-foreground">{site.name}</span>
                <span className="t-small text-foreground/60">{site.location}</span>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}
