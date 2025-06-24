"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";

interface ResponsiveDialogProps {
  open: boolean;
  description: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  title: string;
}
export const ResponsiveDialog = ({
  title,
  open,
  description,
  children,
  onOpenChange,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
