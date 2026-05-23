import { notFound, redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { ServiceForm } from "@/features/dashboard/services/service-form";
import { adminGetService } from "@/services/supabase/queries/admin/services";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditPageProps) {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/services");
  await requireRole(["admin", "editor"]);

  const { id } = await params;
  const service = await adminGetService(id);
  if (!service) notFound();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Services"
        title={service.title}
        description={`Editing /services#${service.slug} — last updated ${new Date(service.updated_at).toLocaleString()}`}
      />
      <ServiceForm service={service} />
    </div>
  );
}
