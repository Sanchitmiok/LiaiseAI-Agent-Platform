"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  openChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  openChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={openChange}
      title="Edit Agent"
      description="Edit the details of your agent."
    >
      <AgentForm
        onSuccess={() => openChange(false)}
        onCancel={() => openChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
