import { redirect } from "next/navigation";

import { AuthCard, AuthLink } from "@/features/auth/auth-card";
import { SignupForm } from "@/features/auth/signup-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCurrentUser } from "@/services/supabase/auth";

export const metadata = buildMetadata({
  title: "Create account",
  description: "Provision your NishantWebLab studio account.",
  path: "/signup",
  noIndex: true,
});

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <AuthCard
      eyebrow="Studio access"
      accent="violet"
      title="Create account"
      description="Default role is client — admin or editor access is granted by the studio."
      footer={
        <>
          Already a member? <AuthLink href="/login">Sign in</AuthLink>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
