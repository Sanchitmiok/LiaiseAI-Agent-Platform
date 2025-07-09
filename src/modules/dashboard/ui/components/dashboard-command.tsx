import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CommandEmpty, CommandGroup } from "cmdk";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const trpc = useTRPC();
  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );

  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Find a meeting or agent"
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandEmpty>
          <span className="text-muted-foreground px-2 py-1">
            No meetings or agents found for <strong>{search}</strong>
          </span>
        </CommandEmpty>
        {meetings.data?.items && meetings.data.items.length > 0 && (
          <CommandGroup heading="Meetings">
            {meetings.data.items.map((meeting) => (
              <CommandItem
                key={meeting.id}
                onSelect={() => {
                  router.push(`/meetings/${meeting.id}`);
                  setOpen(false);
                }}
              >
                {meeting.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {agents.data?.items && agents.data.items.length > 0 && (
          <CommandGroup heading="Agents">
            {agents.data.items.map((agent) => (
              <CommandItem
                key={agent.id}
                onSelect={() => {
                  router.push(`/agents/${agent.id}`);
                  setOpen(false);
                }}
              >
                {agent.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
