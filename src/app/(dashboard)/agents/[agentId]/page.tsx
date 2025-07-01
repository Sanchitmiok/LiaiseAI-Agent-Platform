import { auth } from "@/lib/auth";
import { AgentIdView, AgentIdviewError, AgentIdviewLoading } from "@/modules/agents/ui/views/agentId-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect("/sign-in");
    }
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdviewLoading/>}>
        <ErrorBoundary fallback={<AgentIdviewError />}>
            <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;


