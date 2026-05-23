import { AuthCard, AuthLink } from "@/features/auth/auth-card";
import { ResetForm } from "@/features/auth/reset-form";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Reset password",
  description: "Reset access to your NishantWebLab studio account.",
  path: "/reset",
  noIndex: true,
});

export default function ResetPage() {
  return (
    <AuthCard
      eyebrow="Recover access"
      accent="cyan"
      title="Reset password"
      description="We'll email you a recovery link. Open it to set a new password."
      footer={
        <>
          Remembered it? <AuthLink href="/login">Sign in</AuthLink>
        </>
      }
    >
      <ResetForm />
    </AuthCard>
  );
}
