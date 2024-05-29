import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ReactElement } from "react";
import React from "react";
import { cn } from "@/lib/utils";
import { date } from "zod";

interface ModalProps {
  trigger: ReactElement;
  title: string;
  date?: string;
  icon?: ReactElement;
  content: ReactElement;
  calendar?: boolean;
  footer?: ReactElement;
  // form es por defecto true
  form?: boolean;
}

export default function Modal({
  trigger,
  title,
  date,
  icon,
  content,
  calendar,
  footer,
  form,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent calendar={calendar}>
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex flex-col sm:flex-row items-center   ",
              icon ? "justify-center sm:justify-between gap-2 px-3" : ""
            )}
          >
            <span className="order-3 sm:order-1">{title}</span>
            <span className="text-sm text-muted-foreground font-light order-1 sm:order-2">{date}</span>
            {icon && (
              <span className="w-10 sm:w-7 h-10 sm:h-7 order-2 flex items-center justify-center">
                {React.cloneElement(icon, { className: "w-full h-full" })}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        {content}

        {form ? (
          ''
        ) : (
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </DialogClose>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
