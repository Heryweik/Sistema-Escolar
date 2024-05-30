"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { AlertCircle, Check, Plus } from "lucide-react";
import { PiExclamationMark } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

// Eventos por defecto que se muestran en el calendario
interface Event {
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay: boolean;
  id: number;
}

export default function CalendarEvent() {
  // Estos son eventos que deberian de venir desde la BD
  const defaultEvents: Event[] = [
    {
      title: "Meeting",
      start: new Date("2024-05-25T10:00:00"),
      end: new Date("2024-05-27T18:00:00"),
      allDay: false,
      id: 1,
    },
    {
      title: "Conference",
      start: new Date("2024-05-26T14:00:00"),
      end: new Date("2024-05-28T17:00:00"),
      allDay: false,
      id: 2,
    },
    {
      title: "Workshop",
      start: new Date("2024-05-27T09:30:00"),
      allDay: false,
      id: 3,
    },
    {
      title: "Webinar",
      start: new Date("2024-05-28T16:00:00"),
      allDay: false,
      id: 4,
    },
    {
      title: "Seminar",
      start: new Date("2024-05-29T11:15:00"),
      allDay: false,
      id: 5,
    },
    {
      title: "Hackathon",
      start: new Date("2024-05-30"),
      end: new Date("2024-06-01"),
      allDay: true,
      id: 6,
    },
  ];

  //Obtenemos la ruta para mostrar el componente con los eventos solo en administracion
  const pathname = usePathname();

  // Eventos que se pueden arrastrar, esto basicamente seria una lista de eventos que tendriamos en una BD
  const [events, setEvents] = useState([
    { title: "Feriados", id: "1" },
    { title: "Feria", id: "2" },
    { title: "Viaje", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);

  const [allEvents, setAllEvents] = useState<Event[]>(defaultEvents);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  // Este efecto se encarga de hacer draggable los eventos que se pueden arrastrar
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
  }

  return (
    <>
      <section className="flex  flex-col items-center h-[547px] md:h-[490px] w-full justify-between overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 w-full   justify-center">
          <div className="w-full ">
            <FullCalendar
              // Clases de cada celda (Parecida con la de abajo)
              dayCellClassNames={""}
              // Clases para todas las celadas
              viewClassNames={"text-base"}
              // Clases de los eventos
              eventClassNames={"bg-slate-300 hover:bg-slate-500 transition"}
              // Clases de los eventos del dia (Pestaña de week)
              allDayClassNames={""} /* bg-red-100 text-red-500 */
              // Clases de los dias de la semana
              dayHeaderClassNames={"bg-slate-100 text-base font-normal"}
              // Altura del calendario
              /* height={'auto'} */

              // Texto de todo el dia
              allDayText="Todo el día"
              // Iconos de los botones
              buttonIcons={{
                prev: "chevron-left",
                next: "chevron-right",
                prevYear: "chevron-double-left",
                nextYear: "chevron-double-right",
              }}
              // NO se xD
              buttonHints={{
                prev: "Anterior",
                next: "Siguiente",
                prevYear: "Año anterior",
                nextYear: "Año siguiente",
                dayGridMonth: "Mes",
                today: "Hoy",
              }}
              // Texto de los botones
              buttonText={{
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                list: "Lista",
                nextYear: "Año siguiente",
                prevYear: "Año anterior",
              }}
              titleFormat={{
                year: "numeric",
                month: "long",
              }}
              // Cambia a español los dias de la semana
              locale={"es"}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
                /* resourceTimelineWook, nextYear prevYear */
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>

          <div
            id="draggable-el"
            className={cn(
              "border-2 p-2 rounded-md  items-center text-center flex-col h-[547px] md:h-[490px] bg-slate-50",
              pathname === "/administracion" ? "hidden md:flex" : "hidden"
            )}
          >
            <h1 className="font-bold text-lg text-center whitespace-nowrap">
              Drag Event
            </h1>
            <span className="text-xs text-gray-400">
              Create your recent events
            </span>
            <div className="flex flex-col items-center justify-between flex-1">
              <div>
                {events.map((event) => (
                  <div
                    className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white cursor-pointer"
                    title={event.title}
                    key={event.id}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
              <button className="bg-slate-900 hover:bg-slate-700 transition flex text-white px-4 py-2 rounded-md">
                Añadir <Plus className="h-6 w-6 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal para eliminar eventos */}
        <Transition show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className={cn(
              "relative z-40",
              pathname === "/administracion" ? "block" : "hidden"
            )}
            onClose={setShowDeleteModal}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-400/20 backdrop-blur-sm transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full justify-center text-center items-center sm:p-0">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel
                    className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <AlertCircle
                            className="h-10 w-10 "
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Eliminar Evento
                          </DialogTitle>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              ¿Estás seguro de que deseas eliminar este evento?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row-reverse gap-2 sm:px-6">
                      <Button
                        type="button"
                        onClick={handleDelete}
                        className="w-full sm:w-auto"
                      >
                        Eliminar
                      </Button>

                      <Button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full sm:w-auto"
                        variant={"outline"}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Modal para agregar eventos */}
        <Transition show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className={cn(
              "relative z-40",
              pathname === "/administracion" ? "block" : "hidden"
            )}
            onClose={() => setShowModal(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-400/20 backdrop-blur-sm transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full justify-center  text-center items-center sm:p-0">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all w-full max-w-lg">
                    <div className="">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-900 mt-4">
                        <Check className="h-9 w-9" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Añadir Evento
                        </DialogTitle>
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="my-4 mx-4">
                            <Input
                              type="text"
                              name="title"
                              value={newEvent.title}
                              onChange={handleChange}
                              placeholder="Nombre del evento"
                            />
                          </div>

                          <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row-reverse gap-2 sm:px-6">
                            <Button
                              type="submit"
                              onClick={handleDelete}
                              className="w-full sm:w-auto"
                            >
                              Crear
                            </Button>

                            <Button
                              type="button"
                              onClick={handleCloseModal}
                              className="w-full sm:w-auto"
                              variant={"outline"}
                            >
                              Cerrar
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </section>
    </>
  );
}

// Calendario de asignaciones
export function CalendarAsigments({
  studentAsigments,
}: {
  studentAsigments: any;
}) {
  const defaultEvents: Event[] = studentAsigments.map(
    (asigment: {
      name: any;
      dateStart: any;
      dateFinish: any;
      id: any;
      allDay: any;
    }) => ({
      title: asigment.name,
      start: asigment.dateStart,
      end: asigment.dateFinish,
      allDay: asigment.allDay,
      id: asigment.id,
    })
  );

  const [allEvents, setAllEvents] = useState<Event[]>(defaultEvents);

  return (
    <>
      <section className="flex  flex-col items-center h-[547px] md:h-[490px] w-full justify-between overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 w-full   justify-center">
          <div className="w-full ">
            <FullCalendar
              // Clases de cada celda (Parecida con la de abajo)
              dayCellClassNames={""}
              // Clases para todas las celadas
              viewClassNames={"text-base"}
              // Clases de los eventos
              eventClassNames={"bg-slate-300 hover:bg-slate-500 transition"}
              // Clases de los eventos del dia (Pestaña de week)
              allDayClassNames={""} /* bg-red-100 text-red-500 */
              // Clases de los dias de la semana
              dayHeaderClassNames={"bg-slate-100 text-base font-normal"}
              // Altura del calendario
              /* height={'auto'} */

              // Texto de todo el dia
              allDayText="Todo el día"
              // Iconos de los botones
              buttonIcons={{
                prev: "chevron-left",
                next: "chevron-right",
                prevYear: "chevron-double-left",
                nextYear: "chevron-double-right",
              }}
              // NO se xD
              buttonHints={{
                prev: "Anterior",
                next: "Siguiente",
                prevYear: "Año anterior",
                nextYear: "Año siguiente",
                dayGridMonth: "Mes",
                today: "Hoy",
              }}
              // Texto de los botones
              buttonText={{
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                list: "Lista",
                nextYear: "Año siguiente",
                prevYear: "Año anterior",
              }}
              titleFormat={{
                year: "numeric",
                month: "long",
              }}
              // Cambia a español los dias de la semana
              locale={"es"}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }} /* resourceTimelineWook, nextYear prevYear */
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
