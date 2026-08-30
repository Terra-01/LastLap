"use client";

import { useEffect, useRef, useState } from "react";
import type { Rig } from "@/lib/content";
import { RigCard } from "@/components/rigs/RigCard";
import { cn } from "@/lib/utils";

export function RigsCarousel({ rigs }: { rigs: Rig[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const a = slidesRef.current[0];
      const b = slidesRef.current[1];
      if (!a) return;
      const step = b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
      if (step <= 0) return;
      setActive(Math.max(0, Math.min(Math.round(track.scrollLeft / step), rigs.length - 1)));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rigs.length]);

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
      >
        {rigs.map((rig, i) => (
          <div
            key={rig.name}
            data-idx={i}
            ref={(el) => {
              slidesRef.current[i] = el;
            }}
            className="min-w-0 shrink-0 basis-[86%] snap-start sm:basis-[calc(50%-0.5rem)] lg:basis-auto"
          >
            <RigCard rig={rig} />
          </div>
        ))}
      </div>

      {/* dot indicators — mobile only (one card visible) */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
        {rigs.map((rig, i) => (
          <button
            key={rig.name}
            type="button"
            aria-label={`Go to ${rig.name}`}
            aria-current={i === active}
            onClick={() =>
              slidesRef.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            }
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 ease-brand",
              i === active ? "w-6 bg-brand" : "w-1.5 bg-foreground/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
