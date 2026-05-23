/**
 * Augment NodeJS.ProcessEnv with our known keys.
 * Runtime validation lives in `src/lib/utils/env.ts`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "test" | "production";

    readonly NEXT_PUBLIC_SITE_URL?: string;

    readonly NEXT_PUBLIC_SUPABASE_URL?: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    readonly SUPABASE_SERVICE_ROLE_KEY?: string;

    readonly NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string;
    readonly SENTRY_DSN?: string;

    readonly NEXT_PUBLIC_ENABLE_EXPERIMENTAL_3D?: "true" | "false";
  }
}

export {};
