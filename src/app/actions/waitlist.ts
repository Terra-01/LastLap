"use server";

import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { saveWaitlistContact } from "@/lib/resend";
import type { WaitlistState } from "@/lib/waitlist-types";

const schema = z.object({
  // Email is optional; validated only when the visitor provides one.
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "That email doesn't look right.").optional(),
  phone: z.string().regex(/^(\+?91)?[6-9]\d{9}$/, "Enter a valid 10-digit phone number."),
  source: z.string().min(1, "Let us know how you found us."),
});

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: bots tend to fill every field, humans never see this one.
  if (formData.get("company")) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/[\s-]/g, "");
  const parsed = schema.safeParse({
    email: email || undefined,
    phone,
    source: String(formData.get("source") ?? "").trim(),
  });

  if (!parsed.success) {
    const errors: NonNullable<WaitlistState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors, message: "Please fix the highlighted fields." };
  }

  try {
    if (process.env.DATABASE_URL) {
      await getPrisma().waitlistSignup.create({
        data: { email: parsed.data.email ?? null, phone: parsed.data.phone, source: parsed.data.source },
      });
    } else {
      // Local dev without a DB: don't fail, just log so the UI flow is testable.
      console.warn("[waitlist] DATABASE_URL not set, skipping save (dev only):", parsed.data);
    }
    // Save the contact to Resend for later. No confirmation email goes out yet.
    if (parsed.data.email) await saveWaitlistContact(parsed.data.email);
    return { status: "success" };
  } catch (err) {
    // Already on the list (unique email) is a happy path, not an error.
    if (err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "P2002") {
      return { status: "success" };
    }
    console.error("[waitlist] save failed:", err);
    return { status: "error", message: "Something went wrong. Try again in a bit, or just WhatsApp us." };
  }
}
