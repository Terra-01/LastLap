"use client";

import { useActionState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";
import type { WaitlistState } from "@/lib/waitlist-types";
import { waitlist, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const initial: WaitlistState = { status: "idle" };

const inputCls =
  "w-full rounded-[2px] border border-hairline bg-transparent px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors duration-200 ease-brand placeholder:text-foreground/35 focus:border-brand aria-[invalid=true]:border-brand";

const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.944-11.893a11.821 11.821 0 0 0-3.487-8.405";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={WA_PATH} />
    </svg>
  );
}

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initial);

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-[2px] bg-brand text-white">
          <Check className="size-5" />
        </span>
        <h3 className={compact ? "t-h6" : "t-h5"}>{waitlist.successTitle}</h3>
        <p className="t-small text-muted-foreground">{waitlist.successBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2.5">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="pointer-events-none absolute h-0 w-0 opacity-0" />

      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <input name="email" type="email" aria-label="Email (optional)" placeholder="Email (optional)" aria-invalid={!!state.errors?.email} className={inputCls} />
          {state.errors?.email && <span className="text-[12px] text-brand">{state.errors.email}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <input name="phone" type="tel" required aria-label="Phone number" placeholder="Phone (+91)" aria-invalid={!!state.errors?.phone} className={inputCls} />
          {state.errors?.phone && <span className="text-[12px] text-brand">{state.errors.phone}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <select
          name="source"
          defaultValue=""
          required
          aria-label={waitlist.sourceLabel}
          aria-invalid={!!state.errors?.source}
          className={cn(inputCls, "bg-night text-foreground/90")}
        >
          <option value="" disabled>
            {waitlist.sourceLabel}
          </option>
          {waitlist.sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {state.errors?.source && <span className="text-[12px] text-brand">{state.errors.source}</span>}
      </div>

      {state.status === "error" && state.message && !state.errors && (
        <p className="text-[12px] text-brand">{state.message}</p>
      )}

      <div className="grid grid-cols-[1fr_auto] gap-2.5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-[2px] bg-brand px-5 py-2.5 text-[15px] font-semibold tracking-[-0.02em] text-white transition-colors duration-200 ease-brand hover:bg-brand-hover disabled:opacity-60"
        >
          <span className="sm:hidden">{pending ? waitlist.sending : waitlist.button.labelShort}</span>
          <span className="hidden sm:inline">{pending ? waitlist.sending : waitlist.button.label}</span>
          {!pending && <ArrowRight className="size-[16px]" />}
        </button>
        <a
          href={site.whatsapp.wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-hairline px-4 py-2.5 text-[15px] font-semibold tracking-[-0.02em] text-foreground transition-colors duration-200 ease-brand hover:border-[#25D366] hover:text-[#25D366]"
        >
          <WhatsAppIcon className="size-[18px] text-[#25D366]" />
          WhatsApp
        </a>
      </div>
    </form>
  );
}
