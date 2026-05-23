"use server";

import { contactFormSchema, type ContactFormInput } from "@/validations/contact";

export interface ContactActionResult {
  ok: boolean;
  message: string;
  /** Field-level error map (only populated on validation failure). */
  errors?: Partial<Record<keyof ContactFormInput, string[]>>;
}

/**
 * `submitContact` — server action for the public contact form.
 *
 * Phase 3 contract:
 *  - Re-validates with the same Zod schema the client uses (defense in depth).
 *  - Honeypot (`website` field) — bots fill it; humans don't see it. We
 *    return a stubbed success so bots don't learn anything from the response.
 *  - Persists nothing yet (Phase 4 will write to Supabase `messages` table
 *    via `getSupabaseServiceRoleClient`).
 *  - Adds a small simulated latency so client-side optimistic UX is honest.
 *
 * The return shape is plain serializable JSON (required for Server Actions).
 */
export const submitContact = async (
  payload: ContactFormInput,
): Promise<ContactActionResult> => {
  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors: fieldErrors as ContactActionResult["errors"],
    };
  }

  // Honeypot — silently accept and log internally.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  // Phase 4 hook: persist to Supabase + notify via Realtime.
  // const supabase = await getSupabaseServiceRoleClient();
  // if (supabase) {
  //   await supabase.from("messages").insert({
  //     name: parsed.data.name,
  //     email: parsed.data.email,
  //     company: parsed.data.company || null,
  //     message: parsed.data.message,
  //     source: "contact_form",
  //   });
  // }

  // Light log so we have a footprint of submissions even before persistence.
  console.log("[contact:received]", {
    name: parsed.data.name,
    email: parsed.data.email,
    budget: parsed.data.budget,
  });

  // Simulated latency so the UI's submitting state is visible.
  await new Promise((r) => setTimeout(r, 700));

  return {
    ok: true,
    message: "Thanks — we'll be in touch within one business day.",
  };
};
