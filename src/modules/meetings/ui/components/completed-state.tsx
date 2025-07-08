import { MeetingGetOne } from "../../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  SparklesIcon,
  VideotapeIcon,
} from "lucide-react";

import Markdown from "react-markdown";
import Link from "next/link";
import { GeneartedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}

function CompletedState({ data }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-14">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <BookOpenTextIcon /> Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <FileTextIcon /> Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <VideotapeIcon /> Recording
              </TabsTrigger>
              <TabsTrigger
                value="chatwithai"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
              >
                <SparklesIcon /> Chat with AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-2 py-3 flex items-center justify-center">
            {/* Note video will be deleted from stream after two weeks */}
            {data.recordingUrl ? (
              <video
                src={data.recordingUrl}
                className="rounded-md max-w-full max-h-[500px] w-full sm:max-w-[500px] md:max-w-[900px]"
                controls
              />
            ) : (
              <p className="text-gray-500">Recording not available</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-white rounded-lg border ">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-2 capitalize"
                >
                  <GeneartedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p>{data.startTime ? format(data.startTime, "PPP") : ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>
              <Badge
                variant={"outline"}
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : "N/A"}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1
                        className="text-2xl font-semibold mb-4 text-gray-900"
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        className="text-xl font-semibold mb-3 text-gray-800"
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        className="text-lg font-medium mb-2 text-gray-700"
                        {...props}
                      />
                    ),
                    h4: (props) => (
                      <h4
                        className="text-base font-medium mb-2 text-gray-600"
                        {...props}
                      />
                    ),
                    h5: (props) => (
                      <h5
                        className="text-sm font-medium mb-1 text-gray-500"
                        {...props}
                      />
                    ),
                    h6: (props) => (
                      <h6
                        className="text-xs font-medium mb-1 text-gray-400"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="mb-3 leading-relaxed text-gray-800"
                        {...props}
                      />
                    ),
                    ul: (props) => (
                      <ul
                        className="list-disc list-inside mb-3 pl-5"
                        {...props}
                      />
                    ),
                    ol: (props) => (
                      <ol
                        className="list-decimal list-inside mb-3 pl-5"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-1" {...props} />,
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 border-gray-200 pl-4 italic text-gray-700 mb-3"
                        {...props}
                      />
                    ),
                    code: (props) => (
                      <code
                        className="bg-gray-100 text-gray-800 rounded px-1.5 py-0.5 font-mono text-sm"
                        {...props}
                      />
                    ),
                    pre: (props) => (
                      <pre
                        className="bg-gray-100 text-gray-800 rounded-lg p-3 overflow-x-auto mb-4"
                        {...props}
                      />
                    ),
                    a: (props) => (
                      <a
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    strong: (props) => (
                      <strong
                        className="font-semibold text-gray-900"
                        {...props}
                      />
                    ),
                    em: (props) => (
                      <em className="italic text-gray-700" {...props} />
                    ),
                    hr: () => <hr className="my-6 border-t border-gray-200" />,
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="chatwithai">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CompletedState;
