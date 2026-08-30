import { Gamepad2 } from "lucide-react";
import { rigs } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { RigsCarousel } from "@/components/rigs/RigsCarousel";

export function Rigs() {
  return (
    <Section id="rigs">
      <Container>
        <SectionHeader {...rigs.header} />

        <Reveal className="mt-12 lg:mt-16">
          <RigsCarousel rigs={rigs.rigs} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-5 border-t border-hairline pt-8 lg:mt-12">
            <p className="t-small text-muted-foreground">Run your favourites</p>
            <div className="flex flex-wrap items-center gap-2">
              {rigs.games.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-hairline px-3 py-1.5 t-small text-foreground/85"
                >
                  <Gamepad2 className="size-3.5 shrink-0 text-brand" />
                  {g}
                </span>
              ))}
              <span className="t-small text-muted-foreground">+ a long list more</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
