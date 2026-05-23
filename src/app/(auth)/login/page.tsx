import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to the NishantWebLab studio dashboard.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <GlowBorder accent="blue">
      <GlassCard variant="strong" sheen className="p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          Studio access
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-semibold">Sign in</h1>
        <p className="mt-3 text-sm text-(--foreground-muted)">
          Authentication ships in <span className="text-(--foreground)">Phase 4</span>. The
          form will be wired to Supabase Auth with email + magic-link sign-in.
        </p>

        <form className="mt-8 grid gap-4" aria-label="Sign in (preview)">
          <label className="grid gap-1.5">
            <span className="text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
              Email
            </span>
            <input
              type="email"
              disabled
              placeholder="you@studio.com"
              className="h-11 rounded-xl border border-(--border-strong) bg-(--surface-1)/40 px-4 text-sm placeholder:text-(--color-paper-400)/70 focus:border-(--color-accent-blue)/50 focus:outline-none"
            />
          </label>
          <Button type="submit" disabled>
            Continue
          </Button>
        </form>

        <p className="mt-6 text-xs text-(--foreground-muted)">
          New to the studio?{" "}
          <Link href="/signup" className="text-(--color-accent-cyan) hover:underline">
            Create an account
          </Link>
          ·{" "}
          <Link href="/reset" className="text-(--color-accent-cyan) hover:underline">
            Forgot password
          </Link>
        </p>
      </GlassCard>
    </GlowBorder>
  );
}
