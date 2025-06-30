"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../table/columns";
import EmptyState from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export function AgentsView() {
  const [filters, setFilters] = useAgentsFilter();
  const trpc = useTRPC();
  const router = useRouter();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length > 0 && (
        <>
          <DataTable data={data.items} columns={columns}
          onRowClick={(row) => router.push(`/agents/${row.id}`)} />
          <DataPagination
           page = {filters.page}
           totalPages = {data.totalPages}
           onPageChange = {(page : number) => setFilters({page})} />
        </>
      )}
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Agents are AI assistants that can help you with various tasks. Create one to get started."
        />
      )}
    </div>
  );
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
      title="Error loading agents"
      description="Please try after few minutes"
    />
  );
};
