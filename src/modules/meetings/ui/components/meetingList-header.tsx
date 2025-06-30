"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { PlusIcon } from "lucide-react";

function MeetingListHeader() {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} openChange={setisDialogOpen} />
      <div className="pb-4">
        <div className="py-4 px-4 md:px-8 bg-accent border-b flex flex-col gap-y-4 ">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold md:text-xl">Meetings</h5>
            <Button
              onClick={() => {
                setisDialogOpen(true);
              }}
            >
             <PlusIcon/>Add Meeting
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetingListHeader;
