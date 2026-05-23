/**
 * Supabase Database types — skeleton.
 *
 * In Phase 4 this file will be REGENERATED from the live schema with:
 *
 *   pnpm supabase gen types typescript --project-id <id> > src/services/supabase/types.ts
 *
 * The shape below is intentionally hand-authored as a forward-compatible
 * skeleton so the rest of the app can compile against it today and we can
 * swap the generated output in without churn.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Roles enforced via RLS in Phase 4. Mirror of `src/types#Role`. */
export type DbRole = "admin" | "editor" | "client";

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
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          content: Json | null;
          cover_url: string | null;
          tech_stack: string[] | null;
          live_url: string | null;
          repo_url: string | null;
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
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          icon: string | null;
          order_index: number;
          published: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
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
          tags: string[] | null;
          author_id: string | null;
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
          message: string;
          source: string | null;
          handled: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["messages"]["Row"],
          "id" | "created_at" | "handled"
        > & {
          id?: string;
          created_at?: string;
          handled?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { role: DbRole };
    CompositeTypes: Record<string, never>;
  };
}

/** Convenience aliases used by feature code. */
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
