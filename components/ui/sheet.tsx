"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = ({ ...props }: DialogPrimitive.Root.Props) => (
  <DialogPrimitive.Root data-slot="sheet" {...props} />
);

const SheetTrigger = ({ ...props }: DialogPrimitive.Trigger.Props) => (
  <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

const SheetClose = ({ ...props }: DialogPrimitive.Close.Props) => (
  <DialogPrimitive.Close data-slot="sheet-close" {...props} />
);

const SheetPortal = ({ ...props }: DialogPrimitive.Portal.Props) => (
  <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
);

const SheetOverlay = ({ className, ...props }: React.ComponentProps<"div">) => (
  <DialogPrimitive.Backdrop
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[side=bottom]:animate-in data-[side=left]:animate-in data-[side=right]:animate-in data-[side=top]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
);

const SheetContent = ({
  className,
  children,
  side = "bottom",
  hideClose = false,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "bottom" | "left" | "right" | "top";
  hideClose?: boolean;
}) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Popup
      data-slot="sheet-content"
      data-side={side}
      className={cn(
        "fixed z-50 flex flex-col bg-background shadow-lg transition duration-200",
        side === "bottom" &&
          "inset-x-0 bottom-0 rounded-t-lg slide-in-from-bottom",
        side === "left" && "inset-y-0 left-0 w-3/4 slide-in-from-left",
        side === "right" && "inset-y-0 right-0 w-3/4 slide-in-from-right",
        side === "top" && "inset-x-0 top-0 rounded-b-lg slide-in-from-top",
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </SheetPortal>
);

const SheetHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="sheet-header"
    className={cn(
      "flex flex-col space-y-1.5 p-4 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

const SheetTitle = ({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) => (
  <h2
    data-slot="sheet-title"
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  >
    {children}
  </h2>
);

const SheetDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p
    data-slot="sheet-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
};
