"use client";

import Modal from "@/components/modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Book,
  Check,
  ChevronLeft,
  FilePen,
  Route,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { space } from "postcss/lib/list";
import { useState } from "react";

// Ejemplo de la informacion que se recibira de los estudiantes
export const students = [
  {
    id: 1,
    name: "Maryori",
    classes: [
      {
        id: 1,
        name: "Matemáticas",
        teacher: "Luis",
        students: 30,
      },
      {
        id: 2,
        name: "Física",
        teacher: "Luis",
        students: 30,
      },
    ],
    assignments: [],
  },
  {
    id: 2,
    name: "Brayan",
    classes: [
      {
        id: 1,
        name: "Matemáticas",
        teacher: "Luis",
        students: 30,
      },
      {
        id: 2,
        name: "Física",
        teacher: "Luis",
        students: 30,
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Tarea 1",
        class: "Física",
      },
      {
        id: 2,
        name: "Tarea 2",
        class: "Física",
      },
    ],
  },
  {
    id: 3,
    name: "Katia",
    classes: [
      {
        id: 1,
        name: "Matemáticas",
        teacher: "Luis",
        students: 30,
      },
      {
        id: 2,
        name: "Física",
        teacher: "Luis",
        students: 30,
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Tarea 1",
        class: "Matemáticas",
      },
      {
        id: 2,
        name: "Tarea 2",
        class: "Matemáticas",
      },
    ],
  },
];

export default function ClasesPage() {
  const router = useRouter();

  // estado para controlar si ya se mostro el mensaje de No tienes asignaciones
  let noAssignments = false;

  // Cantidad de clases en total de todos los estudiantes
  const totalClasses = students.reduce(
    (acc, student) => acc + student.classes.length,
    0
  );

  // Estado para controlar el acordeón activo
  // Esto servira para cuando se necesite que un acordeon en especifico este abierto al redirigir desde otra pagina
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    students.length > 0 ? `estudiante-${students[0].id}` : null
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
          <h1 className="text-3xl font-semibold">Clases</h1>
          <div className="w-8"></div>
        </div>
        <div className="w-full flex items-center justify-end">
          <span>clases: {totalClasses}</span>
        </div>
        <section className="flex items-center justify-center gap-10 md:gap-24 w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={activeAccordion ?? ''}
            onValueChange={(value) => setActiveAccordion(value)}
          >
            {students.map((student) => (
              <AccordionItem
                key={student.id}
                value={`estudiante-${student.id}`}
                
              >
                <AccordionTrigger>
                  <span className="max-w-[45%] w-full truncate text-left">
                    {student.name}
                  </span>
                  <span className="max-w-[45%] w-full truncate text-left">
                    clases: {student.classes.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="overflow-x-auto">
                  <div className="flex flex-col w-full gap-2">
                    {/* Clases */}
                    {student.classes.map((clase) => (
                      <div
                        className="flex items-center gap-2 justify-between px-5"
                        key={clase.id}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Book className="h-4 w-4" />
                          <span>{clase.name}</span>
                        </div>

                        {/* Modal de la clase */}
                        <Modal
                          trigger={<div>Ver</div>}
                          title={clase.name}
                          icon={<Book />}
                          content={
                            <div className="w-full flex flex-col gap-2">
                              <span>Docente: {clase.teacher}</span>
                              <span>Alumnos: {clase.students}</span>
                              <Card className="relative flex flex-col items-center justify-center gap-4 w-full h-auto transition-all ease-in-out duration-300 p-4">
                                <span className="w-full text-left">
                                  Asignaciones:
                                </span>
                                {student.assignments.map((assignment) => {
                                  if (assignment.class === clase.name) {
                                    noAssignments = false;
                                    return (
                                      <div
                                        key={assignment.id}
                                        className="flex items-center gap-2 justify-between px-5 w-full"
                                      >
                                        <div className="flex items-center justify-center gap-2">
                                          <FilePen className="h-4 w-4" />
                                          <span>{assignment.name}</span>
                                        </div>
                                        <Button size={"sm"}
                                          onClick={() => {
                                            // Navegamos a la pagina de la asignaciones
                                            router.push(`/asignaciones`);
                                          }}
                                        >Ver</Button>
                                      </div>
                                    );
                                  } else {
                                    noAssignments = true;
                                  }
                                })}

                                {/* Si no hay asignaciones aparece mensaje */}
                                {student.assignments.length === 0 ||
                                noAssignments ? (
                                  <span>
                                    No hay asignaciones para esta clase
                                  </span>
                                ) : null}
                              </Card>
                            </div>
                          }
                        />
                      </div>
                    ))}

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
