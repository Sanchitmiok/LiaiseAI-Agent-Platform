"Use Client";
import { useTRPC } from "@/trpc/client";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  Call,
  CallingState,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CallUI } from "./call-ui";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const Call_Connect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const [client, setclient] = useState<StreamVideoClient>();

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });

    setclient(_client);
    return () => {
      _client.disconnectUser();
      setclient(undefined);
    };
  }, [generateToken, userId, userName, userImage]);

  const [call, setcall] = useState<Call>();

  useEffect(() => {
    const _call = client?.call("default", meetingId);
    _call?.camera.disable();
    _call?.microphone.disable();
    setcall(_call);

    return () => {
      if (_call?.state.callingState !== CallingState.LEFT) {
        _call?.leave();
        _call?.endCall();
        setcall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar ">
        <LoaderPinwheelIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
