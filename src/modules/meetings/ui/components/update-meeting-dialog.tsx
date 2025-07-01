"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  openChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  openChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={openChange}
      title="Update Meeting"
      description="Edit the details of your meeting."
    >
      <MeetingForm
        onSuccess={() => openChange(false)}
        onCancel={() => openChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
