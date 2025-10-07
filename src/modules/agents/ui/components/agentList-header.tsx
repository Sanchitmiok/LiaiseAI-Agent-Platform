"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function AgentListHeader() {
  // Custom hook to get and set agent filters (search, page, etc.)
  const [filters, setFilters] = useAgentsFilter();

  // State to control visibility of the "New Agent" dialog
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Boolean to check if any filter (currently only 'search') is active
  // Used to conditionally show the "Reset Filters" button
  const isAnyfiltermodified = !!filters.search;

  // Function to reset all filters to their default values
  // Sets 'search' to empty and 'page' to DEFAULT_PAGE
  const handleResetFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <div className="pb-4">
      {/* Renders the dialog for creating a new agent.
          Controlled by isDialogOpen state. */}
      <NewAgentDialog open={isDialogOpen} openChange={setIsDialogOpen} />

      {/* Header section with title and "Create Agent" button */}
      <div className="py-4 px-4 md:px-8 bg-accent border-b flex flex-col gap-y-4 ">
        <div className="flex items-center justify-between">
          {/* Displays the heading for the agent list */}
          <h5 className="font-semibold md:text-xl">My Agents</h5>
          {/* Button to open the "New Agent" dialog.
              On click, sets isDialogOpen to true. */}
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Filter section with search and reset functionality */}
      <ScrollArea>
        <div className="flex items-center gap-x-2 px-4 md:px-8 py-2">
          {/* Search input for filtering agents by name or other criteria */}
          <AgentsSearchFilter />
          {/* If any filter is active, show the "Reset Filters" button.
              Clicking it resets filters to default values. */}
          {isAnyfiltermodified && (
            <Button
              variant="outline"
              size="sm"
              className="py-2"
              onClick={handleResetFilters}
            >
              <XIcon className="" /> Reset Filters
            </Button>
          )}
          {/* ScrollBar for horizontal scrolling if filters overflow */}
          <ScrollBar/>
        </div>
      </ScrollArea>
    </div>
  );
}

export default AgentListHeader;
