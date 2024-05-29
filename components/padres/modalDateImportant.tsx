import React from "react";
import { Calendar, CalendarClock } from "lucide-react";
import Modal from "../modal";
import CalendarEvent, { CalendarAsigments } from "../calendar";

interface CalendarProps {
  asigments?: boolean;
  studentAsigments?: {
    id: number;
    name: string;
    class: string;
    description: string;
    allDay: boolean;
    dateStart: string;
    dateFinish: string;
  }[]
  };

export default function ModalDateImportant({ asigments, studentAsigments }: CalendarProps) {
  return (
    <div>
      <Modal
        trigger={
          <>
            {asigments ? (
              <div className="button-default-calendar">Calendar</div>
            ) : (
              <>
                <div className="button-default">
                  <span>Fechas importantes</span>
                </div>
                <div className="button-default-icon">
                  <Calendar className="h-6 w-6 " />
                </div>
              </>
            )}
          </>
        }
        title={`${asigments ? "Asignaciones" : "Fechas importantes"}`}
        icon={asigments ? <CalendarClock /> : <Calendar />}
        content={
          <div className="w-full flex flex-col gap-2">
            {asigments ? (
              <CalendarAsigments studentAsigments={studentAsigments}/>
            ): (
            <CalendarEvent />
            )}
          </div>
        }
        calendar
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
            <div className="button-default-icon-ghost">
              <Calendar className="h-7 w-7 " />
            </div>
          </>
        }
        title={"Fechas importantes"}
        icon={<Calendar />}
        content={
          <div className="w-full flex flex-col gap-2">
            <CalendarEvent />
          </div>
        }
        calendar
      />
    </div>
  );
}
