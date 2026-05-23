import { redirect } from "next/navigation";

import { AuthCard, AuthLink } from "@/features/auth/auth-card";
import { LoginForm } from "@/features/auth/login-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/services/supabase/auth";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to the NishantWebLab studio dashboard.",
  path: "/login",
  noIndex: true,
});

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  // Already signed in? Bounce to dashboard.
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthCard
      eyebrow="Studio access"
      accent="blue"
      title="Sign in"
      description="Use the email and password you set up for the studio dashboard."
      footer={
        <>
          New to the studio? <AuthLink href="/signup">Create an account</AuthLink>
          <span aria-hidden>·</span>
          <AuthLink href="/reset">Forgot password</AuthLink>
        </>
      }
    >
      {params.error ? (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-(--color-danger)/40 bg-(--color-danger)/10 px-4 py-3 text-sm text-(--color-danger)"
        >
          {decodeURIComponent(params.error)}
        </p>
      ) : null}
      <LoginForm next={params.next} />
    </AuthCard>
  );
}
