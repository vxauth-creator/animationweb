import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Tell us about your project — we'll come back within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build <span className="text-gradient">something cinematic</span>
        </>
      }
      description="The Phase-3 form is wired to a Zod schema, RHF resolver, honeypot anti-spam, and a server action that persists messages via Supabase in Phase 4."
      outline={[
        { title: "Validated", copy: "Zod schema shared between client + server." },
        { title: "Anti-spam", copy: "Honeypot field + rate limiting at the edge." },
        { title: "GDPR", copy: "Explicit consent before submission." },
        { title: "Realtime", copy: "Notifies the studio dashboard the instant a lead lands." },
      ]}
      phase="Phase 3 · Forms"
    />
  );
}
