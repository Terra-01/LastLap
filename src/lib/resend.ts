import { Resend } from "resend";

// We save each signup as a Resend contact now (for later); the confirmation
// email is held until launch.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Add the signup to Resend (Contacts) so it's saved for later. Best-effort:
// never throws and sends no email, so a Resend hiccup can't fail the waitlist
// save (the row is already in Neon). No-op until RESEND_API_KEY is set.
export async function saveWaitlistContact(email: string): Promise<void> {
  if (!resend) return;
  try {
    const { error } = await resend.contacts.create({ email, unsubscribed: false });
    if (error) console.error("[waitlist] resend contact not saved:", error);
  } catch (err) {
    console.error("[waitlist] resend contact save failed:", err);
  }
}

// Dormant until launch — the confirmation email is held for now. At launch,
// pass the recipient address and send via resend.emails.send(...).
export async function sendWaitlistConfirmation(): Promise<void> {
  if (!resend) return; // no key, nothing goes out
  // TODO (launch): resend.emails.send({ from, to, subject, html })
}
