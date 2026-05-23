import "server-only";

import { getSupabaseServerClient } from "@/services/supabase/server";

import type { ServiceRow } from "@/services/supabase/types";

export const adminListServices = async (): Promise<ReadonlyArray<ServiceRow>> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });
  if (error || !data) return [];
  return data;
};

export const adminGetService = async (id: string): Promise<ServiceRow | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  return data;
};
