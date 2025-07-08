"use client";
import ErrorState from "@/components/ErrorState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Call_Provider from "../components/call-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status == "completed") {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4 px-4">
        <div className="flex flex-col justify-between items-center bg-white rounded-xl">
          <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
        <Button asChild className="mb-4">
          <Link href="/meetings">Go back</Link>
        </Button>
        </div>
      </div>
    );
  }

  return <Call_Provider meetingId={data.id} meetingName={data.name} />;
};
