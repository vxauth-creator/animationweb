import "server-only";

import { capabilities } from "@/lib/utils/env";
import { getSupabaseServerClient } from "@/services/supabase/server";
import { services as localServices } from "@/lib/data/services";

import type { GlyphKey, Service as LocalService } from "@/lib/data/services";
import type { ServiceRow } from "@/services/supabase/types";

const fromRow = (row: ServiceRow): LocalService => ({
  slug: row.slug,
  title: row.title,
  summary: row.summary,
  capabilities: row.capabilities,
  metric:
    row.metric_value && row.metric_label
      ? { value: row.metric_value, label: row.metric_label }
      : undefined,
  accent: row.accent,
  glyph: row.glyph as GlyphKey,
});

export const getServices = async (): Promise<ReadonlyArray<LocalService>> => {
  if (!capabilities.hasSupabasePublic) return localServices;
  const supabase = await getSupabaseServerClient();
  if (!supabase) return localServices;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) return localServices;
  return data.map(fromRow);
};
