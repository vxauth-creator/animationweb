import { notFound, redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { ProjectForm } from "@/features/dashboard/projects/project-form";
import { adminGetProject } from "@/services/supabase/queries/admin/projects";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditPageProps) {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/projects");
  await requireRole(["admin", "editor"]);

  const { id } = await params;
  const project = await adminGetProject(id);
  if (!project) notFound();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Projects"
        title={project.title}
        description={`Editing /${project.slug} — last updated ${new Date(project.updated_at).toLocaleString()}`}
      />
      <ProjectForm project={project} />
    </div>
  );
}
