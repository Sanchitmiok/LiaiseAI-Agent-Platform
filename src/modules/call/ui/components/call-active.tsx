import Image from "next/image";
import Link from "next/link";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";


interface Props {
  onLeave: () => void;
  meetingName: string;
}


export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen  text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 bg-[#101213] rounded-full">
        <div className=" backdrop-blur-sm rounded-full flex items-center gap-3 px-4 py-2 w-fit max-w-full">
          <Link
            href="/"
            className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Image src="/logo.svg" width={20} height={20} alt="Logo" />
          </Link>
          <h4 className="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-none">
            {meetingName}
          </h4>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 pt-16 pb-20 px-4">
        <div className="h-full rounded-xl overflow-hidden">
          <SpeakerLayout />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-[#101213]  backdrop-blur-sm rounded-full px-4 py-2 flex justify-center">
          <CallControls onLeave={onLeave} />
        </div>
      </div>
    </div>
  );
};
