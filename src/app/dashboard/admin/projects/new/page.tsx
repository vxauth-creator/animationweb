import { redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { ProjectForm } from "@/features/dashboard/projects/project-form";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

export default async function NewProjectPage() {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/projects");
  await requireRole(["admin", "editor"]);

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Projects"
        title="New project"
        description="Add a new portfolio entry. Save as a draft to keep it off the public site until you're ready."
      />
      <ProjectForm />
    </div>
  );
}
