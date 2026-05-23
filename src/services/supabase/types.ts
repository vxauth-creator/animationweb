/**
 * Supabase Database types — schema mirror.
 *
 * Hand-authored to mirror `supabase/migrations/*.sql`. Regenerate from a live
 * project with:
 *
 *   pnpm supabase gen types typescript --linked > src/services/supabase/types.ts
 *
 * Until then, keep this file in lockstep with the SQL.
 *
 * NOTE: each table's Row/Insert/Update is declared as a local alias *first*
 * and the `Database` type then references those aliases. Inlining the
 * relationships (e.g. `Update: Partial<Database[...]["Insert"]>`) creates a
 * self-reference that TS resolves to `never`, so the Supabase client API
 * collapses to `unknown`/`never[]` shapes.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type DbRole = "admin" | "editor" | "client";

export type ProjectCategory =
  | "saas"
  | "marketing"
  | "dashboard"
  | "commerce"
  | "ai"
  | "experience";

export type Accent = "blue" | "cyan" | "violet";

export interface ProjectMetric {
  value: string;
  label: string;
}

/* =============================================================================
 * profiles
 * ===========================================================================*/
type ProfilesRow = {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: DbRole;
  created_at: string;
  updated_at: string;
};
type ProfilesInsert = {
  id?: string;
  user_id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  role?: DbRole;
  created_at?: string;
  updated_at?: string;
};
type ProfilesUpdate = Partial<ProfilesInsert>;

/* =============================================================================
 * services
 * ===========================================================================*/
type ServicesRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
  metric_value: string | null;
  metric_label: string | null;
  accent: Accent;
  glyph: string;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
type ServicesInsert = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  capabilities?: string[];
  metric_value?: string | null;
  metric_label?: string | null;
  accent?: Accent;
  glyph?: string;
  order_index?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};
type ServicesUpdate = Partial<ServicesInsert>;

/* =============================================================================
 * projects
 * ===========================================================================*/
type ProjectsRow = {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  category: ProjectCategory;
  year: number;
  stack: string[];
  metrics: ProjectMetric[];
  cover_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  accent: Accent;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
type ProjectsInsert = {
  id?: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  category: ProjectCategory;
  year: number;
  stack?: string[];
  metrics?: ProjectMetric[];
  cover_url?: string | null;
  live_url?: string | null;
  repo_url?: string | null;
  accent?: Accent;
  featured?: boolean;
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};
type ProjectsUpdate = Partial<ProjectsInsert>;

/* =============================================================================
 * testimonials
 * ===========================================================================*/
type TestimonialsRow = {
  id: string;
  quote: string;
  author: string;
  author_role: string;
  company: string;
  tag: string | null;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
type TestimonialsInsert = {
  id?: string;
  quote: string;
  author: string;
  author_role: string;
  company: string;
  tag?: string | null;
  order_index?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};
type TestimonialsUpdate = Partial<TestimonialsInsert>;

/* =============================================================================
 * blog_posts
 * ===========================================================================*/
type BlogPostsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  tags: string[];
  category_slug: string | null;
  author_id: string | null;
  reading_minutes: number | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
type BlogPostsInsert = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_url?: string | null;
  tags?: string[];
  category_slug?: string | null;
  author_id?: string | null;
  reading_minutes?: number | null;
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};
type BlogPostsUpdate = Partial<BlogPostsInsert>;

/* =============================================================================
 * messages
 * ===========================================================================*/
type MessagesRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  source: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  handled: boolean;
  handled_by: string | null;
  handled_at: string | null;
  created_at: string;
};
type MessagesInsert = {
  id?: string;
  name: string;
  email: string;
  company?: string | null;
  budget?: string | null;
  message: string;
  source?: string | null;
  ip_hash?: string | null;
  user_agent?: string | null;
  handled?: boolean;
  handled_by?: string | null;
  handled_at?: string | null;
  created_at?: string;
};
type MessagesUpdate = Partial<MessagesInsert>;

/* =============================================================================
 * Database
 * ===========================================================================*/
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfilesRow;
        Insert: ProfilesInsert;
        Update: ProfilesUpdate;
        Relationships: [];
      };
      services: {
        Row: ServicesRow;
        Insert: ServicesInsert;
        Update: ServicesUpdate;
        Relationships: [];
      };
      projects: {
        Row: ProjectsRow;
        Insert: ProjectsInsert;
        Update: ProjectsUpdate;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialsRow;
        Insert: TestimonialsInsert;
        Update: TestimonialsUpdate;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostsRow;
        Insert: BlogPostsInsert;
        Update: BlogPostsUpdate;
        Relationships: [];
      };
      messages: {
        Row: MessagesRow;
        Insert: MessagesInsert;
        Update: MessagesUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_role: { Args: Record<string, never>; Returns: string };
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_editor_or_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: { role: DbRole };
    CompositeTypes: Record<string, never>;
  };
}

/* ---------- Convenience aliases ----------------------------------------- */

export type Profile = ProfilesRow;
export type ServiceRow = ServicesRow;
export type ProjectRow = ProjectsRow;
export type TestimonialRow = TestimonialsRow;
export type BlogPostRow = BlogPostsRow;
export type MessageRow = MessagesRow;
export type MessageInsert = MessagesInsert;

/** Back-compat aliases — earlier phases imported these names. */
export type Project = ProjectsRow;
export type Service = ServicesRow;
export type BlogPost = BlogPostsRow;
export type Message = MessagesRow;
