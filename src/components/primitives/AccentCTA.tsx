import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Props = {
  label: string;
  href?: string;
  variant?: "underline" | "sideline";
  className?: string;
};

/**
 * The site's signature CTA: never a filled button — text + arrow with a red bar.
 * - underline: red bar (≈61×5px) beneath the label (primary CTAs)
 * - sideline: short red dash (≈20×4px) to the left of the label (secondary / eyebrow)
 */
export function AccentCTA({ label, href = "#", variant = "underline", className }: Props) {
  if (variant === "sideline") {
    return (
      <a
        href={href}
        className={cn(
          "group inline-flex items-center gap-3 text-foreground transition-colors duration-200 ease-brand hover:text-brand",
          className,
        )}
      >
        <span className="h-[4px] w-5 shrink-0 bg-brand" />
        <span className="text-[16px] font-semibold tracking-[-0.02em]">{label}</span>
      </a>
    );
  }

  return (
    <a href={href} className={cn("group inline-flex flex-col items-start gap-3", className)}>
      <span className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-foreground transition-colors duration-200 ease-brand group-hover:text-brand">
        {label}
        <ArrowRight className="size-[18px] transition-transform duration-200 ease-brand group-hover:translate-x-1" />
      </span>
      <span className="h-[5px] w-[60px] bg-brand transition-all duration-200 ease-brand group-hover:w-[84px]" />
    </a>
  );
}
