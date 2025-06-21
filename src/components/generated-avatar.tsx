import React from 'react'

import {createAvatar} from "@dicebear/core";
import {botttsNeutral , initials} from "@dicebear/collection";

import { cn } from '@/lib/utils';

import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"

interface GereratedAvatarProps {
    seed : string;
    className ?: string;
    variant : "botttsNeutral" | "initials";
}

export const GeneartedAvatar = ({seed , className , variant} : GereratedAvatarProps)=>{
    let avatar;
    if(variant === "botttsNeutral"){
        avatar = createAvatar(botttsNeutral , {seed});
    }else{
        avatar = createAvatar(initials , {
            seed,
            fontWeight: 500,
            fontSize : 42,
        })
    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt='AI Avatar'/>
                <AvatarFallback>
                    {seed.charAt(0).toUpperCase()}
                </AvatarFallback>
        </Avatar>
    )
}
