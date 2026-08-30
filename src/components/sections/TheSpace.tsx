import Image from "next/image";
import { space } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { SpaceCarousel } from "@/components/space/SpaceCarousel";
import { cn } from "@/lib/utils";

// Editorial gallery: one lead image + a row of four.
const layout = [
  "sm:col-span-2 lg:col-span-8 lg:h-[440px]",
  "lg:col-span-4 lg:h-[440px]",
  "lg:col-span-4 lg:h-[300px]",
  "lg:col-span-4 lg:h-[300px]",
  "lg:col-span-4 lg:h-[300px]",
];

export function TheSpace() {
  return (
    <Section id="space">
      <Container>
        <SectionHeader {...space.header} />

        <Reveal className="mt-12 lg:mt-16">
          {/* Mobile: swipeable carousel with indicators */}
          <div className="sm:hidden">
            <SpaceCarousel images={space.images} />
          </div>

          {/* Tablet / desktop: editorial grid */}
          <div className="hidden grid-cols-1 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
            {space.images.map((img, i) => (
              <div
                key={img.src}
                className={cn(
                  "group relative aspect-[16/10] overflow-hidden rounded-[2px] border border-hairline lg:aspect-auto",
                  layout[i],
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
