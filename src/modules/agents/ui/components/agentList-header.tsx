"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

function AgentListHeader() {
  const [filters, setFilters] = useAgentsFilter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const isAnyfiltermodified = !!filters.search;
  const handleResetFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    })
  }
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
      <div className="flex items-center gap-x-2 px-4 md:px-8 py-2">
        <AgentsSearchFilter />
        {isAnyfiltermodified && (
          <Button variant="outline" size="sm" className="py-2" onClick={handleResetFilters}>
            <XIcon className="" /> Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}

export default AgentListHeader;
