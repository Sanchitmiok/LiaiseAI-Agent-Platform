import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";

const statusOptions = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];


export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilter();

    return (
        <CommandSelect
            options={statusOptions}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            value={filters.status ?? ""}
            placeholder="Status"
            className="h-9"
        />
    );
};
