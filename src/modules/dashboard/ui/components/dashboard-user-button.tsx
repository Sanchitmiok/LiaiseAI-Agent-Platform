"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar , AvatarImage} from "@/components/ui/avatar"; 

// Dhyan se dekhte rehna kahi ye sare components radix ui se n import ho jaaye
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import React from "react";
import { GeneartedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
function DashBoardUserButtion() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter()

  const onLogout = async function () {
     await authClient.signOut({
      fetchOptions : {
        onSuccess:()=>{
          router.push("/sign-in")
        }
      }
     })
  }

  if (isPending || !data?.user) {
    return <div>Null</div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger  className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) :(<GeneartedAvatar seed={data.user.name} variant="botttsNeutral" className="size-9 mr-3"/>)}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full capitalize">{data.user.name}</p>
          <p className="text-xs truncate w-full ">{data.user.email}</p>
        </div>
        <ChevronDownIcon/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" className="w-72">
        <DropdownMenuLabel>

          {/* Issue */}
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate capitalize">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
          </div>
          
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4"/>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogout}>
          Logout
          <LogOutIcon className="size-4"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashBoardUserButtion;
