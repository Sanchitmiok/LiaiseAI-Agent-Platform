"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneartedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateAgentDialogOpen, setupdateAgentDialogOpen] = useState(false)
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this agent?",
    "This action cannot be undone. All data related to this agent will be permanently deleted."
  );

  const handleRemoveAgent = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) {
      return;
    }

    await removeAgent.mutateAsync({ id: agentId });
  };

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        router.push("/agents");
      },
      onError: (error) => {
        console.error("Error removing agent:", error);
        toast.error(error.message || "Failed to remove agent");
      },
    })
  );

  return (
    <>
      <RemoveConfirmation/>
      <UpdateAgentDialog open={updateAgentDialogOpen} openChange={setupdateAgentDialogOpen} initialValues={data}/>
      <div className="flex-1/2 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => {
            setupdateAgentDialogOpen(true);
          }}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white border rounded-lg">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneartedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2>{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&> svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data?.meetingCount}{" "}
              {data?.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdviewLoading = () => {
  return (
    <Loading
      title="Loading Agent"
      description="Please wait for few seconds..."
    />
  );
};
export const AgentIdviewError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Oops! Something went wrong. Please try again later."
    />
  );
};
