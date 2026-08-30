import { faq } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeader
          title={
            <>
              <span className="block">{faq.header.titleLines[0]}</span>
              <span className="block">{faq.header.titleLines[1]}</span>
            </>
          }
          paragraph={faq.header.paragraph}
          cta={faq.header.cta}
        />

        <Reveal className="mt-12 lg:mt-16">
          <Accordion className="flex flex-col gap-3">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-[2px] border border-hairline bg-night px-6"
              >
                <AccordionTrigger className="py-5 text-left text-[16px] font-medium tracking-[-0.02em] text-foreground hover:no-underline sm:text-[17px] [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-brand">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="t-body max-w-[70ch] pb-6 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
