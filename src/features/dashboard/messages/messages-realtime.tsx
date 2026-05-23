"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRealtimeChannel } from "@/hooks/use-realtime-channel";

import type { MessageRow } from "@/services/supabase/types";

interface MessagesRealtimeProps {
  /** SSR-rendered count, used for the initial badge. */
  initialUnhandled: number;
}

/**
 * `<MessagesRealtime>` — realtime activity badge for the inbox.
 *
 * Subscribes to `public.messages` change events. On INSERT, increments the
 * unhandled count + fires a toast pointing at the new submission. On any
 * change, triggers a soft `router.refresh()` so the table stays accurate
 * without a full reload.
 *
 * Lives inside the inbox page so the subscription is automatically torn
 * down when the user navigates away.
 */
export const MessagesRealtime = ({ initialUnhandled }: MessagesRealtimeProps) => {
  const router = useRouter();
  const [unhandled, setUnhandled] = useState(initialUnhandled);

  useEffect(() => {
    setUnhandled(initialUnhandled);
  }, [initialUnhandled]);

  useRealtimeChannel<MessageRow>({
    channel: "messages-inbox",
    table: "messages",
    onChange: (payload) => {
      if (payload.eventType === "INSERT") {
        setUnhandled((n) => n + 1);
        toast("New message in", {
          description:
            (payload.new?.name as string | undefined)
              ? `${payload.new.name as string} just submitted the contact form.`
              : "A new contact form submission landed.",
        });
      }
      router.refresh();
    },
  });

  return (
    <span
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border border-(--border-strong) bg-(--surface-1)/60 px-3 py-1 font-mono text-xs"
    >
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent-cyan)" />
      <span>
        Live · <strong>{unhandled}</strong> unhandled
      </span>
    </span>
  );
};
