import "server-only";

import { getSupabaseServerClient, getSupabaseServiceRoleClient } from "@/services/supabase/server";

import type { Profile } from "@/services/supabase/types";

/**
 * Admin user list — joins `profiles` with `auth.users` (via service role)
 * so we can surface email + last sign-in next to role.
 */
export interface AdminUserRow extends Profile {
  email: string | null;
  last_sign_in_at: string | null;
}

export const adminListUsers = async (): Promise<ReadonlyArray<AdminUserRow>> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (!profiles) return [];

  // Use service role to enrich with auth metadata. RLS on profiles is admin-
  // only for cross-user reads; the page guard already ensures admin role.
  const service = await getSupabaseServiceRoleClient();
  if (!service) {
    return profiles.map((p) => ({ ...p, email: null, last_sign_in_at: null }));
  }

  const enriched = await Promise.all(
    profiles.map(async (profile): Promise<AdminUserRow> => {
      const { data, error } = await service.auth.admin.getUserById(profile.user_id);
      if (error || !data?.user) {
        return { ...profile, email: null, last_sign_in_at: null };
      }
      return {
        ...profile,
        email: data.user.email ?? null,
        last_sign_in_at: data.user.last_sign_in_at ?? null,
      };
    }),
  );
  return enriched;
};
