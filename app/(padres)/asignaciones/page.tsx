"use client";

import Modal from "@/components/modal";
import AsigmentForm from "@/components/padres/asigmentForm";
import ModalDateImportant from "@/components/padres/modalDateImportant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { infoStudents } from "@/lib/dataStudents";
import { ChevronLeft, FilePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AsignacionesPage() {
  const router = useRouter();

  // Informacion de los estudiantes
  const students = infoStudents;

  // Cantidad de asignaciones en total de todos los estudiantes
  const totalAsigments = students.reduce(
    (acc, student) => acc + student.assignments.length,
    0
  );

  // Estado para controlar el acordeón activo
  // Esto servira para cuando se necesite que un acordeon en especifico este abierto al redirigir desde otra pagina
  //Obtenemos id del estudiante desde localStorage
  const studentId = localStorage.getItem("studentId");

  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    students.length > 0
      ? `estudiante-${studentId ? studentId : students[0].id}`
      : null
  );

  return (
    <div className="flex flex-col items-center py-10 md:py-20 h-full relative overflow-y-auto">
      <div className="flex flex-col w-full items-center gap-10 justify-center z-10 max-w-4xl  text-center">
        <div className="flex items-center justify-between w-full">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full"
            onClick={() => {
              // Regresamos a la pagina anterior
              router.back();
            }}
          >
            <ChevronLeft className="h-8 w-8 hover:text-slate-400 transition" />
          </Button>
          <h1 className="text-3xl font-semibold">Asignaciones</h1>
          <div className="w-8"></div>
        </div>
        <div className="w-full flex items-center justify-between">
          {/* Modal que muestra el calendario con las fechas importantes (Feriados eventos y demas) */}
          <ModalDateImportant />

          <span>Asignaciones: {totalAsigments}</span>
        </div>
        <section className="flex items-center justify-center gap-10 md:gap-24 w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={activeAccordion ?? ""}
            onValueChange={(value) => setActiveAccordion(value)}
          >
            {students.map((student) => (
              <AccordionItem
                key={student.id}
                value={`estudiante-${student.id}`}
                onClick={() => {
                  // Guardamos el id del estudiante en el localStorage
                  localStorage.setItem("studentId", student.id.toString());
                }}
              >
                <AccordionTrigger>
                  <span className="max-w-[45%] w-full truncate text-left">
                    {student.name}
                  </span>
                  <span className="max-w-[45%] w-full truncate text-left">
                    Asignaciones: {student.assignments.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="overflow-x-auto">
                  <div className="flex flex-col items-center w-full gap-2">
                    {/* Asignaciones */}

                    {student.assignments.map((asignacion) => (
                      <div
                        className="flex w-full items-center gap-2 justify-between px-5"
                        key={asignacion.id}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FilePen className="h-4 w-4" />
                          <span>{asignacion.name}</span>
                        </div>

                        {/* Modal de la asignacion */}
                        <Modal
                          trigger={
                            <div className="button-default-watch">
                              Ver
                            </div>
                          }
                          title={asignacion.name}
                          date={asignacion.dateFinish}
                          icon={<FilePen />}
                          content={
                            <div className="w-full flex flex-col gap-2">
                              <span>Clase: {asignacion.class}</span>

                              <AsigmentForm
                                description={asignacion.description}
                              />
                            </div>
                          }
                          form
                        />
                      </div>
                    ))}
                    {student.assignments.length === 0 ? (
                      <span>No hay asignaciones</span>
                    ) : (
                      /* Modal que muestra el calendario con las asignaciones del estudiante */
                      <ModalDateImportant asigments />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
