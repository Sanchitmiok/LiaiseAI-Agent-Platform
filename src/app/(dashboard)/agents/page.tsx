import {
  AgentsView,
  AgentsviewError,
  AgentsviewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import AgentListHeader from "@/modules/agents/ui/components/agentList-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";


interface Props {
  searchParams : Promise<SearchParams>
}

async function page({ searchParams }: Props) {
  const filters  = await loadSearchParams(searchParams);

  
   const session = await auth.api.getSession({
      headers : await headers(),
    });
  
  
  
    if( !session) {
      redirect('/sign-in');
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));
  return (
    //dehydrate: Server pe data ko “pack” karta hai.
    //HydrationBoundary: Client pe us data ko “unpack” karta hai.
    <div>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsviewLoading />}>
        <ErrorBoundary fallback={<AgentsviewError />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </div>
  );
}

export default page;
