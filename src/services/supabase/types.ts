/**
 * Supabase Database types — schema mirror.
 *
 * Hand-authored to mirror `supabase/migrations/*.sql`. Regenerate from a live
 * project with:
 *
 *   pnpm supabase gen types typescript --linked > src/services/supabase/types.ts
 *
 * Until then, keep this file in lockstep with the SQL.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Roles enforced by RLS. Mirror of `src/types#Role`. */
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

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: DbRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: DbRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };

      services: {
        Row: {
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
        Insert: Omit<
          Database["public"]["Tables"]["services"]["Row"],
          "id" | "created_at" | "updated_at"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };

      projects: {
        Row: {
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
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at" | "updated_at"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };

      testimonials: {
        Row: {
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
        Insert: Omit<
          Database["public"]["Tables"]["testimonials"]["Row"],
          "id" | "created_at" | "updated_at"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
        Relationships: [];
      };

      blog_posts: {
        Row: {
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
        Insert: Omit<
          Database["public"]["Tables"]["blog_posts"]["Row"],
          "id" | "created_at" | "updated_at"
        > & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [];
      };

      messages: {
        Row: {
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
        Insert: Omit<
          Database["public"]["Tables"]["messages"]["Row"],
          "id" | "created_at" | "handled" | "handled_by" | "handled_at"
        > & {
          id?: string;
          created_at?: string;
          handled?: boolean;
          handled_by?: string | null;
          handled_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
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

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];
export type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

/** Back-compat aliases — earlier phases imported these names. */
export type Project = ProjectRow;
export type Service = ServiceRow;
export type BlogPost = BlogPostRow;
export type Message = MessageRow;
