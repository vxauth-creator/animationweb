"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProject, togglePublishProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/dialogs/confirm-action";

interface ProjectRowActionsProps {
  id: string;
  published: boolean;
}

export const ProjectRowActions = ({ id, published }: ProjectRowActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const togglePublish = () => {
    startTransition(async () => {
      const result = await togglePublishProject(id, !published);
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
      <Button type="button" href={`/dashboard/admin/projects/${id}`} size="sm" variant="ghost" flat>
        Edit
      </Button>
      <ConfirmAction
        trigger={
          <Button type="button" size="sm" variant="ghost" flat>
            Delete
          </Button>
        }
        title="Delete project?"
        description="This permanently removes the project from the portfolio. RLS guarantees no orphan reads, but the row itself is gone."
        intent="danger"
        confirmLabel="Delete project"
        onConfirm={() => deleteProject(id)}
      />
    </div>
  );
};
