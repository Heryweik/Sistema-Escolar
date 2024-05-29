import React from "react";
import { Calendar } from "lucide-react";
import Modal from "../modal";
import CalendarUsers from "./calendarUsers";

export default function ModalDateImportant() {
  return (
    <div>
      <Modal
        trigger={
          <>
            <div className="hidden sm:block items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              <span>Fechas importantes</span>
            </div>
            <div className=" sm:hidden grid place-content-center  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 ">
              <Calendar className="h-6 w-6 " />
            </div>
          </>
        }
        title={"Fechas importantes"}
        icon={<Calendar />}
        content={
          <div className="w-full flex flex-col gap-2">
            <CalendarUsers />
          </div>
        }
        form
      />
    </div>
  );
}

export function ModalDateImportantMenu() {
  return (
    <div>
      <Modal
        trigger={
          <>
            <div className="grid place-content-center  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 ">
              <Calendar className="h-7 w-7 " />
            </div>
          </>
        }
        title={"Fechas importantes"}
        icon={<Calendar />}
        content={
          <div className="w-full flex flex-col gap-2">
            <CalendarUsers />
          </div>
        }
        form
      />
    </div>
  );
}
