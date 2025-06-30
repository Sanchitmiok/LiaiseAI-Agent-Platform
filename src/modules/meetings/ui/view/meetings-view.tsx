"use client";

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../table/columns";
import EmptyState from "@/components/empty-state";
export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 gap-y-4 flex flex-col">
      {data.items.length > 0 && (
        <DataTable data={data.items} columns={columns} />
      )}

      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Schedule a meeting to connect with others. Meetings can be used for discussions, planning, or any collaborative effort."
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <Loading
      title="Loading Meetings"
      description="Please wait for few seconds..."
    />
  );
};
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading Meetings"
      description="Oops! Something went wrong while loading meetings."
    />
  );
};
