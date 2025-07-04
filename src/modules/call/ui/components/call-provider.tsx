"use client";

import { authClient } from "@/lib/auth-client";
import { LoaderPinwheelIcon } from "lucide-react";
import { Call_Connect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

function Call_Provider({ meetingId, meetingName }: Props) {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar ">
        <LoaderPinwheelIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <Call_Connect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({
          seed: data.user.name,
          variant: "botttsNeutral",
        })
      }
    />
  );
}

export default Call_Provider;
