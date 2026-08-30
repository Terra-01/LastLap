"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { session } from "@/lib/content";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { cn } from "@/lib/utils";

const EASE = [0.44, 0, 0.56, 1] as const;
const ROTATE_MS = 7000;

export function HowItWorks() {
  const { steps, header, defaultActive } = session;
  const [active, setActive] = useState(defaultActive);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0); // drives the active step's fill rail (0 -> 1)
  const step = steps[active];
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    progress.set(reduced ? 1 : 0);
  }, [active, reduced, progress]);

  // Auto-advance, but only once the section scrolls into view (starting from 01).
  // Hover never pauses it; clicking a step jumps and the timer restarts there.
  useEffect(() => {
    if (reduced || !inView) return;
    const remaining = Math.max(ROTATE_MS * (1 - progress.get()), 0);
    const controls = animate(progress, 1, {
      duration: remaining / 1000,
      ease: "linear",
      onComplete: () => setActive((a) => (a + 1) % steps.length),
    });
    return () => controls.stop();
  }, [active, inView, reduced, steps.length, progress]);

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader {...header} />

        <div ref={sectionRef} className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          {/* Image with text overlaid: top on mobile, right on desktop */}
          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-hairline sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src={step.image} alt={step.title} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25" />

            <span className="absolute right-6 top-6 t-h4 tabular-nums text-white/70 lg:right-8 lg:top-8">{step.num}</span>

            <div className="absolute inset-x-6 bottom-6 lg:inset-x-8 lg:bottom-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col gap-2.5"
                >
                  <h3 className="t-h4">{step.title}</h3>
                  <p className="t-body max-w-[48ch] text-white/85">{step.caption}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Timeline nav: below on mobile, left on desktop */}
          <div role="tablist" className="order-2 hidden flex-col border-t border-hairline sm:flex lg:order-1">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.num}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="group relative flex items-baseline gap-5 border-b border-hairline py-6 pl-6 text-left"
                >
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-hairline" />
                  {isActive && (
                    <motion.span style={{ scaleY: progress }} className="absolute left-0 top-0 h-full w-[2px] origin-top bg-brand" />
                  )}
                  <span
                    className={cn(
                      "t-h5 tabular-nums transition-colors duration-300 ease-brand",
                      isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {s.num}
                  </span>
                  <span
                    className={cn(
                      "t-h6 transition-colors duration-300 ease-brand",
                      isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
