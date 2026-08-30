"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Img = { src: string; alt: string };

export function SpaceCarousel({ images }: { images: Img[] }) {
  const [active, setActive] = useState(0);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const a = slidesRef.current[0];
      const b = slidesRef.current[1];
      if (!a) return;
      const step = b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
      if (step <= 0) return;
      setActive(Math.max(0, Math.min(Math.round(track.scrollLeft / step), images.length - 1)));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [images.length]);

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            data-idx={i}
            ref={(el) => {
              slidesRef.current[i] = el;
            }}
            className="relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-[2px] border border-hairline"
          >
            <Image src={img.src} alt={img.alt} fill sizes="86vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
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
