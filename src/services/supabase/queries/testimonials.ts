import "server-only";

import { capabilities } from "@/lib/utils/env";
import { getSupabaseServerClient } from "@/services/supabase/server";
import { testimonials as localTestimonials } from "@/lib/data/testimonials";

import type { Testimonial as LocalTestimonial } from "@/lib/data/testimonials";
import type { TestimonialRow } from "@/services/supabase/types";

const fromRow = (row: TestimonialRow): LocalTestimonial => ({
  id: row.id,
  quote: row.quote,
  author: row.author,
  role: row.author_role,
  company: row.company,
  tag: row.tag ?? undefined,
});

export const getTestimonials = async (): Promise<ReadonlyArray<LocalTestimonial>> => {
  if (!capabilities.hasSupabasePublic) return localTestimonials;
  const supabase = await getSupabaseServerClient();
  if (!supabase) return localTestimonials;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) return localTestimonials;
  return data.map(fromRow);
};
