export { getSupabaseBrowserClient } from "./client";
export { getSupabaseServerClient, getSupabaseServiceRoleClient } from "./server";
export { getAuthContext, getCurrentRole, getCurrentUser, type AuthContext } from "./auth";
export { updateSupabaseSession } from "./middleware-client";
export type {
  Accent,
  BlogPost,
  BlogPostRow,
  Database,
  DbRole,
  Json,
  Message,
  MessageInsert,
  MessageRow,
  Profile,
  Project,
  ProjectCategory,
  ProjectMetric,
  ProjectRow,
  Service,
  ServiceRow,
  TestimonialRow,
} from "./types";
