"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function MeetingListHeader() {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilter();

  const isAnyFilterModified =
    !!filters.status || filters.agentId || filters.search;
  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: null,
      search: null,
      page: 1,
    });
  };
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} openChange={setisDialogOpen} />
      <div className="pb-4">
        <div className="py-4 px-4 md:px-8 bg-accent border-b flex flex-col gap-y-4 ">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold md:text-xl">Meetings</h5>
            <Button
              onClick={() => {
                setisDialogOpen(true);
              }}
            >
              <PlusIcon />
              Add Meeting
            </Button>
          </div>
          <ScrollArea>
            <div className="flex items-center gap-x-2 p-1">
              <MeetingsSearchFilter />
              <StatusFilter />
              <AgentIdFilter />
              {isAnyFilterModified && (
                <div className="hidden md:flex">
                  <Button variant="outline" size="sm" onClick={onClearFilters}>
                  <XCircleIcon />
                  Clear Filters
                </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-2 p-1 md:hidden">
              {isAnyFilterModified && (
                <Button variant="outline" size="sm" onClick={onClearFilters}>
                  <XCircleIcon />
                  Clear Filters
                </Button>
              )}
            </div>
            <ScrollBar className="h-2 w-full" orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default MeetingListHeader;
