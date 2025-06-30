import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneartedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export function MeetingForm({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [agentSearch, setagentSearch] = useState("");
  const [openNewAgentDialog, setopenNewAgentDialog] = useState(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.(data.id);
      },
      onError: (error) => {
        console.error("Error creating Meeting:", error);
        toast.error(
          `Error creating Meeting: ${error.message || "Unknown error"}`
          //TODO: Check if error is "FORBIDDEN" and , redirect to "/upgrade"
        );
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        console.error("Error creating agent:", error);
        toast.error(
          `Error creating agent: ${error.message || "Unknown error"}`
          //TODO: Check if error is "FORBIDDEN" and , redirect to "/upgrade"
        );
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO : updateMeeting");
      updateMeeting.mutate({
        ...values,
        id: initialValues.id,
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
     <NewAgentDialog open = {openNewAgentDialog} openChange={setopenNewAgentDialog}/>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="eq. English tutor" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={setagentSearch}
                    placeholder="Select an agent"
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-2">
                          <GeneartedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you are looking for?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setopenNewAgentDialog(true)}
                  >
                    Create new Agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" disabled={isPending} onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Update" : "Create"} Agent
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
