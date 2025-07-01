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
import { GeneartedAvatar } from "@/components/generated-avatar";

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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <GeneartedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-14 md:size-16"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{data.name}</h2>
              <div className="flex items-center gap-2 mt-1">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              data.status === "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                : data.status === "active"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : data.status === "upcoming"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                : data.status === "processing"
                ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                : data.status === "cancelled"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            }`}
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {data.status === "upcoming" && data.startTime
              ? `Scheduled: ${new Date(data.startTime).toLocaleString()}`
              : data.status === "active" && data.startTime
              ? `Started: ${new Date(data.startTime).toLocaleString()}`
              : data.status === "completed" && data.endTime
              ? `Ended: ${new Date(data.endTime).toLocaleString()}`
              : data.status === "processing"
              ? "Processing recording/transcript"
              : data.status === "cancelled"
              ? "Meeting cancelled"
              : "Not started"}
          </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 min-w-[200px]">
            {data.summary && (
              <div className="max-w-xs text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
          {data.summary}
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
              {data.recordingUrl && (
          <a
            href={data.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition"
          >
            Recording
          </a>
              )}
              {data.transcriptUrl && (
          <a
            href={data.transcriptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-800 transition"
          >
            Transcript
          </a>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-xs text-zinc-400 mt-1">
              <span>
          Created: {new Date(data.createdAt).toLocaleString()}
              </span>
              {data.updatedAt && (
          <span>
            Updated: {new Date(data.updatedAt).toLocaleString()}
          </span>
              )}
              {data.endTime && (
          <span>
            Ended: {new Date(data.endTime).toLocaleString()}
          </span>
              )}
            </div>
          </div>
        </div>

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
