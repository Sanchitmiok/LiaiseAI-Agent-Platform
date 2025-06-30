"use client"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { MeetingForm } from "./meeting-form";

interface NewMeetingDialogProps {
    open : boolean;
    openChange : (open: boolean) => void;
}

export const NewMeetingDialog = ({
    open , openChange
} : NewMeetingDialogProps) => {

    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={openChange}
            title="New Meeting"
            description="Create a new Meeting."
        >
        <MeetingForm onSuccess={() => openChange(false)} onCancel={() => openChange(false)}/>
        </ResponsiveDialog>
    )
}