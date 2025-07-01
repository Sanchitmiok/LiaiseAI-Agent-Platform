import { CommandSelect } from "@/components/command-select";
import { GeneartedAvatar } from "@/components/generated-avatar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { MAX_PAGE_SIZE } from "@/constants";


export const AgentIdFilter = ()=>{
    const [filters, setFilters] = useMeetingsFilter();
    const trpc = useTRPC();
    const [agentSearch, setagentSearch] = useState("")
    const {data} = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize : MAX_PAGE_SIZE,
            search : agentSearch
        })
    )

    return (
        <CommandSelect 
        className="h-9"
        placeholder="Agent"
        options={(data?.items ?? []).map((agent)=>({
            id:agent.id,
            value : agent.id,
            children : (
                <div className="flex items-center gap-2">
                    <GeneartedAvatar
                         variant="botttsNeutral"
                        seed={agent.name}
                        className="size-4"
                    />
                    <span>{agent.name}</span>
                </div>
            )
        }))}
        onSelect={(value) => setFilters({agentId : value})}
        onSearch={setagentSearch}
        value = {filters.agentId ?? ""}
        />
    )

}