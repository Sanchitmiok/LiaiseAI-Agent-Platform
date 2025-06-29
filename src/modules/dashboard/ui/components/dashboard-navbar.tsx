"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashboardCommand from "./dashboard-command";
import { useEffect, useState } from "react";

function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setcommandOpen] = useState(false);

  useEffect(()=>{
    const down = (e : KeyboardEvent) =>{
        if(e.key === "f" && (e.metaKey || e.ctrlKey)){
            e.preventDefault();
            setcommandOpen((open)=>(!open))
        }
    }

    document.addEventListener("keydown" , down);
    return () => document.removeEventListener("keydown" , down)
  } , [])
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setcommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          onClick={() => setcommandOpen(!commandOpen)}
        >
          <SearchIcon />
          Search
          <kbd className=" hidden ml-auto pointer-events-none lg:inline-flex h-5 select-none items-center gap-1 rounded-2xl border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ">
            <span className="text-xs">&#8984;</span> + f
          </kbd>
        </Button>
      </nav>
    </>
  );
}

export default DashboardNavbar;
