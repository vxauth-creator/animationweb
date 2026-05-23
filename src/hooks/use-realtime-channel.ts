"use client";

import { useEffect, useRef } from "react";

import type { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "@/services/supabase/client";

interface UseRealtimeChannelOptions<RowShape extends Record<string, unknown>> {
  /** Stable channel name — usually `${table}-changes`. */
  channel: string;
  /** Public table to subscribe to (without the schema prefix). */
  table: string;
  /** Postgres event type — defaults to all changes. */
  event?: "*" | "INSERT" | "UPDATE" | "DELETE";
  /** Optional Postgres `filter` string (e.g. `handled=eq.false`). */
  filter?: string;
  /** Callback invoked for every change event. */
  onChange: (payload: RealtimePostgresChangesPayload<RowShape>) => void;
}

/**
 * `useRealtimeChannel` — typed Supabase channel subscription.
 *
 * Lifecycle:
 *   - Subscribes on mount; unsubscribes (and removes the channel) on unmount.
 *   - When Supabase isn't configured (env keys absent) the hook is a no-op.
 *   - The `onChange` callback is held in a ref so it can capture the latest
 *     props/state without forcing a resubscribe per render.
 *
 * Phase 5 hooks this into the messages dashboard so a new contact form
 * submission appears in the inbox without a page refresh.
 */
export const useRealtimeChannel = <RowShape extends Record<string, unknown>>({
  channel,
  table,
  event = "*",
  filter,
  onChange,
}: UseRealtimeChannelOptions<RowShape>): void => {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const ch: RealtimeChannel = supabase.channel(channel);

    ch.on(
      // The Realtime client typings collapse multiple overloads into a union;
      // the `postgres_changes` discriminator selects the change-feed shape.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "postgres_changes" as any,
      {
        event,
        schema: "public",
        table,
        filter,
      },
      (payload: RealtimePostgresChangesPayload<RowShape>) => {
        onChangeRef.current(payload);
      },
    ).subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, [channel, table, event, filter]);
};
