"use client"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
    open : boolean;
    openChange : (open: boolean) => void;
}

export const NewAgentDialog = ({
    open , openChange
} : NewAgentDialogProps) => {

    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={openChange}
            title="New Agent"
            description="Create a new agent."
        >
        <AgentForm onSuccess={() => openChange(false)} onCancel={() => openChange(false)}/>
        </ResponsiveDialog>
    )
}