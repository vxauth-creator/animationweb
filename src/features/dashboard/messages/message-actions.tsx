"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { setMessageHandled, deleteMessage } from "@/app/actions/messages";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/dialogs/confirm-action";

interface MessageActionsProps {
  id: string;
  handled: boolean;
}

export const MessageActions = ({ id, handled }: MessageActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    startTransition(async () => {
      const result = await setMessageHandled(id, !handled);
      if (!result.ok) toast.error(result.message);
      else toast.success(result.message);
    });
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button type="button" size="sm" variant="secondary" onClick={toggle} disabled={isPending} flat>
        {handled ? "Reopen" : "Mark handled"}
      </Button>
      <ConfirmAction
        trigger={
          <Button type="button" size="sm" variant="ghost" flat>
            Delete
          </Button>
        }
        title="Delete this message?"
        description="The submission will be permanently removed from the inbox."
        intent="danger"
        confirmLabel="Delete"
        onConfirm={() => deleteMessage(id)}
      />
    </div>
  );
};
