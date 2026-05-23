import { redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { PostForm } from "@/features/dashboard/blog/post-form";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

export default async function NewBlogPostPage() {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/blogs");
  await requireRole(["admin", "editor"]);

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Blog"
        title="New post"
        description="MDX body. Use ```ts to fence syntax-highlighted code blocks. Save as a draft until ready."
      />
      <PostForm />
    </div>
  );
}
