import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AccentCTA } from "./AccentCTA";

type Props = {
  title: ReactNode;
  paragraph: string;
  cta?: { label: string; href: string };
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({ title, paragraph, cta, className, titleClassName }: Props) {
  return (
    <div className={cn("grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16", className)}>
      <Reveal>
        <h2 className={cn("t-h2 max-w-[16ch]", titleClassName)}>{title}</h2>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="flex flex-col gap-6 lg:ml-auto lg:max-w-[30rem] lg:pt-1">
          <p className="t-body text-muted-foreground">{paragraph}</p>
          {cta && <AccentCTA variant="sideline" label={cta.label} href={cta.href} />}
        </div>
      </Reveal>
    </div>
  );
}
