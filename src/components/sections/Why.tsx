import Image from "next/image";
import { why } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";

export function Why() {
  const { header, feature, comfort, textCards, service } = why;

  return (
    <Section id="why">
      <Container>
        <SectionHeader {...header} />

        <div className="mt-12 flex flex-col gap-4 lg:mt-16">
          {/* Big feature: title top, caption bottom, on the image */}
          <Reveal>
            <article className="relative overflow-hidden rounded-[2px] border border-hairline">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/8] md:aspect-[21/8]">
                <Image src={feature.image} alt={feature.title} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/85" />
                <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-10">
                  <h3 className="t-h4 max-w-[18ch]">{feature.title}</h3>
                  <p className="t-body max-w-[46ch] text-white/85">{feature.copy}</p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Bottom row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Comfort: title top, caption bottom, on the image */}
            <Reveal>
              <article className="relative h-full min-h-[400px] overflow-hidden rounded-[2px] border border-hairline lg:min-h-[460px]">
                <Image src={comfort.image} alt={comfort.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/85" />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <h3 className="t-h5">{comfort.title}</h3>
                  <p className="t-body max-w-[34ch] text-white/85">{comfort.copy}</p>
                </div>
              </article>
            </Reveal>

            {/* Two text-only cards (no image, no CTA) */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col gap-4">
                {textCards.map((c) => (
                  <article
                    key={c.title}
                    className="flex flex-1 flex-col justify-center gap-3 rounded-[2px] border border-hairline bg-night p-7"
                  >
                    <h3 className="t-h5">{c.title}</h3>
                    <p className="t-body text-muted-foreground">{c.copy}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            {/* Cafe: title top, caption bottom, on the image */}
            <Reveal delay={0.1}>
              <article className="relative h-full min-h-[400px] overflow-hidden rounded-[2px] border border-hairline lg:min-h-[460px]">
                <Image src={service.image} alt={service.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/85" />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <h3 className="t-h5">{service.title}</h3>
                  <p className="t-body max-w-[34ch] text-white/85">{service.copy}</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
