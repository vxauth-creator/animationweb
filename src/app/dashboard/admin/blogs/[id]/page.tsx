import { notFound, redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { PostForm } from "@/features/dashboard/blog/post-form";
import { adminGetBlogPost } from "@/services/supabase/queries/admin/blog-posts";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  if (!capabilities.hasSupabasePublic) redirect("/dashboard/admin/blogs");
  await requireRole(["admin", "editor"]);

  const { id } = await params;
  const post = await adminGetBlogPost(id);
  if (!post) notFound();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Blog"
        title={post.title}
        description={`Editing /blog/${post.slug} — last updated ${new Date(post.updated_at).toLocaleString()}`}
      />
      <PostForm post={post} />
    </div>
  );
}
