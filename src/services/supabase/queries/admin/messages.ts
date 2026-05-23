import "server-only";

import { getSupabaseServerClient } from "@/services/supabase/server";

import type { MessageRow } from "@/services/supabase/types";

export const adminListMessages = async (): Promise<ReadonlyArray<MessageRow>> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
};

export const adminGetMessage = async (id: string): Promise<MessageRow | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.from("messages").select("*").eq("id", id).maybeSingle();
  return data;
};

export const adminCountUnhandledMessages = async (): Promise<number> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return 0;
  const { count } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("handled", false);
  return count ?? 0;
};
