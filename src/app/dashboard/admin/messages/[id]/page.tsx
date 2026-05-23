import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MessageActions } from "@/features/dashboard/messages/message-actions";
import { adminGetMessage } from "@/services/supabase/queries/admin/messages";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

interface DetailProps {
  params: Promise<{ id: string }>;
}

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString() : "—";

export default async function MessageDetailPage({ params }: DetailProps) {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/messages");
  await requireRole(["admin"]);

  const { id } = await params;
  const message = await adminGetMessage(id);
  if (!message) notFound();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Inbox"
        title={message.name}
        description={`From ${message.email} · ${formatDate(message.created_at)}`}
        meta={
          message.handled ? (
            <Badge variant="muted" size="md">
              Handled · {formatDate(message.handled_at)}
            </Badge>
          ) : (
            <Badge variant="accent" size="md">
              New
            </Badge>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassCard variant="strong" className="p-6 md:p-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
            Message
          </p>
          <p className="mt-3 whitespace-pre-wrap text-(--foreground)/95">{message.message}</p>
        </GlassCard>

        <GlassCard variant="strong" className="grid gap-4 p-6 md:p-7 text-sm">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
              Reply to
            </p>
            <a
              href={`mailto:${message.email}`}
              className="mt-2 block text-(--color-accent-cyan) hover:underline"
            >
              {message.email}
            </a>
          </div>

          {message.company ? (
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                Company
              </p>
              <p className="mt-2">{message.company}</p>
            </div>
          ) : null}

          {message.budget ? (
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                Budget
              </p>
              <p className="mt-2 font-mono">{message.budget}</p>
            </div>
          ) : null}

          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
              Source
            </p>
            <p className="mt-2 font-mono text-xs">{message.source ?? "—"}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
              IP fingerprint
            </p>
            <p className="mt-2 font-mono text-xs text-(--foreground-muted)">
              {message.ip_hash ?? "—"}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
              User agent
            </p>
            <p className="mt-2 line-clamp-3 text-xs text-(--foreground-muted)">
              {message.user_agent ?? "—"}
            </p>
          </div>

          <div className="border-t border-(--border-subtle) pt-4">
            <MessageActions id={message.id} handled={message.handled} />
          </div>
        </GlassCard>
      </div>

      <p className="mt-6">
        <Link
          href="/dashboard/admin/messages"
          className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
        >
          ← Back to inbox
        </Link>
      </p>
    </div>
  );
}
