"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface Props {
  meetingId: string;
}

function MeetingIdView({ meetingId }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const queryClient = useQueryClient();
  const router = useRouter();
  const [updateMeetingDialogOpen, setupdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to delete this meeting?",
    "This action cannot be undone. All data related to this meeting will be permanently deleted."
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: Invalidate free tier usage
        router.push(`/meetings`);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) {
      return;
    }

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        openChange={setupdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1/2 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setupdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpcomingState
          meetingId={meetingId}
          onCancelMeeting={() => {}}
          isCanelling={false}
          />
        )}

        {isCompleted && <div></div>}
      </div>
    </>
  );
}

export default MeetingIdView;

export const MeetingIdviewLoading = () => {
  return (
    <Loading
      title="Loading meeting"
      description="Please wait for few seconds..."
    />
  );
};
export const MeetingIdviewError = () => {
  return (
    <ErrorState
      title="Error loading meeting"
      description="Oops! Something went wrong. Please try again later."
    />
  );
};
