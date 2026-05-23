import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Reset password",
  description: "Reset access to your NishantWebLab studio account.",
  path: "/reset",
  noIndex: true,
});

export default function ResetPage() {
  return (
    <GlowBorder accent="cyan">
      <GlassCard variant="strong" sheen className="p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          Recover access
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-semibold">Reset password</h1>
        <p className="mt-3 text-sm text-(--foreground-muted)">
          Password recovery is wired in Phase 4. Submit your email and we&apos;ll send a secure
          recovery link from Supabase.
        </p>

        <form className="mt-8 grid gap-4" aria-label="Reset password (preview)">
          <label className="grid gap-1.5">
            <span className="text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
              Email
            </span>
            <input
              type="email"
              disabled
              placeholder="you@studio.com"
              className="h-11 rounded-xl border border-(--border-strong) bg-(--surface-1)/40 px-4 text-sm placeholder:text-(--color-paper-400)/70 focus:border-(--color-accent-cyan)/50 focus:outline-none"
            />
          </label>
          <Button type="submit" disabled>
            Send recovery link
          </Button>
        </form>

        <p className="mt-6 text-xs text-(--foreground-muted)">
          Remembered it?{" "}
          <Link href="/login" className="text-(--color-accent-cyan) hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </GlowBorder>
  );
}
