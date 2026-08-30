import Image from "next/image";
import type { ElementType } from "react";
import { Armchair, Disc, Disc3, Footprints, Gauge, Glasses, Monitor, Move3d, Vibrate } from "lucide-react";
import type { Rig } from "@/lib/content";

function specIcon(spec: string): ElementType {
  const s = spec.toLowerCase();
  if (s.includes("vr") || s.includes("headset")) return Glasses;
  if (s.includes("motion")) return Move3d;
  if (s.includes("haptic")) return Vibrate;
  if (s.includes("brake")) return Disc;
  if (s.includes("pedal")) return Footprints;
  if (s.includes("screen") || s.includes("ultrawide") || s.includes("triple")) return Monitor;
  if (s.includes("seat") || s.includes("recline") || s.includes("comfort")) return Armchair;
  if (s.includes("wheel") || s.includes("drive") || s.includes("formula")) return Disc3;
  return Gauge;
}

export function RigCard({ rig }: { rig: Rig }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[2px] border border-hairline bg-night">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={rig.image}
          alt={rig.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-80" />
        <span className="absolute left-3 top-3 rounded-[2px] border border-white/20 bg-night/60 px-2.5 py-1 text-[11px] font-medium tracking-[-0.02em] text-white backdrop-blur-sm">
          {rig.tag}
        </span>
        {rig.beginner && (
          <span className="absolute right-3 top-3 rounded-[2px] bg-brand px-2.5 py-1 text-[11px] font-medium tracking-[-0.02em] text-white">
            Beginner friendly
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="t-h5">{rig.name}</h3>
          <p className="t-body text-muted-foreground">{rig.blurb}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {rig.specs.map((s) => {
            const Icon = specIcon(s);
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-[2px] border border-hairline px-2.5 py-1.5 text-[12px] tracking-[-0.02em] text-foreground/80"
              >
                <Icon className="size-3.5 text-muted-foreground" />
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
