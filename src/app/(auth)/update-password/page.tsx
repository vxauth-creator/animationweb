import { AuthCard, AuthLink } from "@/features/auth/auth-card";
import { UpdatePasswordForm } from "@/features/auth/update-password-form";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Update password",
  description: "Set a new password for your NishantWebLab account.",
  path: "/update-password",
  noIndex: true,
});

export default function UpdatePasswordPage() {
  return (
    <AuthCard
      eyebrow="Final step"
      accent="violet"
      title="Set a new password"
      description="You arrived here via a recovery link. Pick a fresh password to finish signing in."
      footer={
        <>
          Need a new link? <AuthLink href="/reset">Reset password</AuthLink>
        </>
      }
    >
      <UpdatePasswordForm />
    </AuthCard>
  );
}
