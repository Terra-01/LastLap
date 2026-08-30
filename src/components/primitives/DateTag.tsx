import { cn } from "@/lib/utils";

export function DateTag({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 t-small text-foreground/75", className)}>
      <span className="size-1.5 shrink-0 rounded-full bg-brand" />
      {label}
    </span>
  );
}
