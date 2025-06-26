"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";
import EmptyState from "@/components/empty-state";


export function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4">
      {data.length > 0 && (<DataTable data={data} columns={columns} />)}
      {data.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Agents are AI assistants that can help you with various tasks. Create one to get started."
        />
      )}
    </div>
  )
}


export const AgentsviewLoading = () => {
  return (
    <Loading
      title="Loading Agents"
      description="Please wait for few seconds..."
    />
  );
};
export const AgentsviewError = () => {
  return (
    <ErrorState
      title="Error loading state"
      description="Please try after few minutes"
    />
  );
};
