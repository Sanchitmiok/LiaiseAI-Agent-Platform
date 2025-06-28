import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useState , JSX } from "react"


export const useConfirm = (title: string,
  description: string) : [()=> JSX.Element , ()=>Promise<unknown>] => {

    const [promise, setpromise] = useState<{resolve: (value?: boolean) => void} | null>(null);

    const confirm = () => {
        return new Promise((resolve) =>{
            setpromise({resolve});
        })
    }

    const handleClose = () => {
        if (promise) {
            promise.resolve(false);
            setpromise(null);
        }
    }

    const handleConfirm = () => {
        if (promise) {
            promise.resolve(true);
            setpromise(null);
        }
    }

    const handleCancel = () => {
        if (promise) {
            promise.resolve(false);
            setpromise(null);
        }
    }


    const confirmationDialog = () => {
        return (
        <ResponsiveDialog open={!!promise} onOpenChange={handleClose} title={title} description={description}>
          <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
            <Button variant={"outline"} onClick={handleCancel} className="w-full lg:w-auto">
                Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} className="w-full lg:w-auto">
                Confirm
            </Button>
          </div>

        </ResponsiveDialog>
        );
    }


    return [confirmationDialog, confirm];
};
