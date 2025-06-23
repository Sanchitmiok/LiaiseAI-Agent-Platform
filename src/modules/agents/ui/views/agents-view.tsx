"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export const AgentsviewLoading = () => {
  return <Loading title="Loading Agents" description="Please wait for few seconds..."/>;
};
export const AgentsviewError = () => {
  return <ErrorState title="Error loading state" description="Please try after few minutes"/>
};


