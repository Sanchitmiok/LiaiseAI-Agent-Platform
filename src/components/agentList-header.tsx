"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

function AgentListHeader() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <div className="pb-4">
      <NewAgentDialog open={isDialogOpen} openChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 bg-accent border-b flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold md:text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create Agent
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AgentListHeader;
