import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Create account",
  description: "Provision your NishantWebLab studio account.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return (
    <GlowBorder accent="violet">
      <GlassCard variant="strong" sheen className="p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          Studio access
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-semibold">Create account</h1>
        <p className="mt-3 text-sm text-(--foreground-muted)">
          Account creation activates in <span className="text-(--foreground)">Phase 4</span>{" "}
          alongside Supabase Auth, RBAC, and email verification.
        </p>

        <form className="mt-8 grid gap-4" aria-label="Create account (preview)">
          <label className="grid gap-1.5">
            <span className="text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
              Email
            </span>
            <input
              type="email"
              disabled
              placeholder="you@studio.com"
              className="h-11 rounded-xl border border-(--border-strong) bg-(--surface-1)/40 px-4 text-sm placeholder:text-(--color-paper-400)/70 focus:border-(--color-accent-violet)/50 focus:outline-none"
            />
          </label>
          <Button type="submit" disabled>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-xs text-(--foreground-muted)">
          Already a member?{" "}
          <Link href="/login" className="text-(--color-accent-cyan) hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </GlowBorder>
  );
}
