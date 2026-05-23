"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteBlogPost, togglePublishBlogPost } from "@/app/actions/blog-posts";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/dialogs/confirm-action";

interface PostRowActionsProps {
  id: string;
  published: boolean;
}

export const PostRowActions = ({ id, published }: PostRowActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const togglePublish = () => {
    startTransition(async () => {
      const result = await togglePublishBlogPost(id, !published);
      if (!result.ok) toast.error(result.message);
      else toast.success(result.message);
    });
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={togglePublish}
        disabled={isPending}
        flat
      >
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button type="button" href={`/dashboard/admin/blogs/${id}`} size="sm" variant="ghost" flat>
        Edit
      </Button>
      <ConfirmAction
        trigger={
          <Button type="button" size="sm" variant="ghost" flat>
            Delete
          </Button>
        }
        title="Delete this post?"
        description="The post is permanently removed and pulled from the public blog index."
        intent="danger"
        confirmLabel="Delete post"
        onConfirm={() => deleteBlogPost(id)}
      />
    </div>
  );
};
