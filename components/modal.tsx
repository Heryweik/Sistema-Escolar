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

interface ModalProps {
  trigger: ReactElement;
  title: string;
  icon?: ReactElement;
  content: ReactElement;
  footer?: ReactElement;
  // form es por defecto true
  form?: boolean;
}

export default function Modal({
  trigger,
  title,
  icon,
  content,
  footer,
  form,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex flex-col sm:flex-row items-center   ",
              icon ? "justify-center sm:justify-between gap-2 px-3" : ""
            )}
          >
            <span className="order-2 sm:order-1">{title}</span>
            {icon && (
              <span className="w-10 sm:w-7 h-10 sm:h-7 order-1 flex items-center justify-center">
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
