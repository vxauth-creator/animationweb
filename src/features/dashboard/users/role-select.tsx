"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateUserRole } from "@/app/actions/users";
import { Select } from "@/components/ui/select";

import type { DbRole } from "@/services/supabase/types";

interface RoleSelectProps {
  profileId: string;
  value: DbRole;
  /** When true, the select is disabled (e.g. don't let an admin demote themselves). */
  disabled?: boolean;
}

/**
 * `<RoleSelect>` — inline role picker for the users table.
 *
 * Persists immediately via the `updateUserRole` server action. Optimistically
 * keeps the visible value in sync; reverts on error.
 */
export const RoleSelect = ({ profileId, value, disabled }: RoleSelectProps) => {
  const [current, setCurrent] = useState<DbRole>(value);
  const [isPending, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as DbRole;
    const prev = current;
    setCurrent(next);
    startTransition(async () => {
      const result = await updateUserRole(profileId, next);
      if (!result.ok) {
        setCurrent(prev);
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
    });
  };

  return (
    <Select
      value={current}
      onChange={onChange}
      disabled={disabled || isPending}
      className="h-9 max-w-[10rem] py-0 text-xs"
    >
      <option value="client">client</option>
      <option value="editor">editor</option>
      <option value="admin">admin</option>
    </Select>
  );
};
