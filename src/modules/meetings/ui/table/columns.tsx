"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { GeneartedAvatar } from "@/components/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn, formatDuration } from "@/lib/utils";


const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "text-yellow-800 border-yellow-300 bg-yellow-100",
  active: "text-blue-800 border-blue-300 bg-blue-100",
  completed: "text-green-800 border-green-300 bg-green-100",
  processing: "text-indigo-800 border-indigo-300 bg-indigo-100",
  cancelled: "text-red-800 border-red-300 bg-red-100",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-base font-semibold tracking-wide text-gray-800">
        Meeting Name
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize text-lg text-gray-900">
          {row.original.name}
        </span>
        <div className="flex items-center gap-x-3 mt-1">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-xs text-gray-500 max-w-[200px] truncate capitalize italic">
              {row.original.agent.instructions || "No description provided"}
            </span>
          </div>
          <GeneartedAvatar
            className="size-7 border border-gray-200 shadow-sm"
            seed={row.original.agent.name}
            variant="botttsNeutral"
          />
          <span className="text-xs text-gray-400 ml-2">
            {row.original.startTime
              ? format(row.original.startTime, "MMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-base font-semibold tracking-wide text-gray-800">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize flex items-center gap-x-2 px-3 py-1 rounded-full border-2 font-medium text-sm shadow-sm",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              "size-4",
              row.original.status === "processing" && "animate-spin"
            )}
          />
          <span className="tracking-wide">{row.original.status}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: () => (
      <span className="text-base font-semibold tracking-wide text-gray-800">
        Duration
      </span>
    ),
    cell: ({ row }) => {
      const duration = row.original.duration;
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-x-2 px-3 py-1 rounded-full border-2 font-medium text-sm text-gray-700 bg-gray-50 shadow-sm"
        >
          <ClockArrowUpIcon className="size-4 text-gray-400" />
          <span>{duration ? formatDuration(duration) : "N/A"}</span>
        </Badge>
      );
    },
  },
];
