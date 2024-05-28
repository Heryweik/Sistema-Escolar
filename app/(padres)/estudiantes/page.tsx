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
import { VscPerson } from "react-icons/vsc";
import Image from "next/image";
import { AtentionForm } from "@/components/padres/atentionForm";

// Ejemplo de la informacion que se recibira de los estudiantes
export const students = [
  {
    id: 1,
    name: "Maryori",
    course: "II BTP",
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
    atention: [
      {
        id: 1,
        name: "mala actitud",
        course: "II BTP",
        class: "Matemáticas",
      },
    ],
    route: {
      id: 1,
      name: "Instituto central - UNAH",
    },
    parent: {
      id: 1,
      name: "Juan alberto rosales valladares",
      phone: "1234567890",
      email: "example@gmail.com",
    },
  },
  {
    id: 2,
    name: "Brayan",
    course: "III BTP",
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
        course: "II BTP",
        class: "Matemáticas",
      },
      {
        id: 2,
        name: "Tarea 2",
        course: "II BTP",
        class: "Matemáticas",
      },
    ],
    atention: [],
    route: {
      id: 1,
      name: "Ruta 24",
    },
    parent: {
      id: 1,
      name: "Juan",
      phone: "1234567890",
      email: "example@gmail.com",
    },
  },
  {
    id: 3,
    name: "Katia",
    course: "I BTP",
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
        course: "II BTP",
        class: "Matemáticas",
      },
      {
        id: 2,
        name: "Tarea 2",
        course: "II BTP",
        class: "Matemáticas",
      },
    ],
    atention: [
      {
        id: 1,
        name: "mala actitud",
        course: "II BTP",
        class: "Matemáticas",
      },
      {
        id: 2,
        name: "Falta de respeto",
        course: "II BTP",
        class: "Matemáticas",
      },
    ],
    route: {
      id: 1,
      name: "Ruta 24",
    },
    parent: {
      id: 1,
      name: "Juan",
      phone: "1234567890",
      email: "example@gmail.com",
    },
  },
];

export default function EstudiantesPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-semibold">Estudiantes</h1>
          <div className="w-8"></div>
        </div>
        <div className="w-full flex items-center justify-end">
          <span>Estudiantes: {students.length}</span>
        </div>
        <section className="flex items-center justify-center gap-10 md:gap-24 w-full">
          <Accordion type="single" collapsible className="w-full">
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
                    Curso: {student.course}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="overflow-x-auto">
                  <div className="flex flex-col w-full gap-2">
                    {/* Clases */}
                    <div className="flex items-center gap-2 justify-between px-5">
                      <div className="flex items-center justify-center gap-2">
                        <Book className="h-4 w-4" />
                        <span>Clases: {student.classes.length}</span>
                      </div>

                      {student.classes.length === 0 ? (
                        <Button size={"sm"} disabled>
                          Ver
                        </Button>
                      ) : (
                        <Link href="/clases">
                          <Button size={"sm"}>Ver</Button>
                        </Link>
                      )}
                    </div>

                    {/* Asignaciones */}
                    <div className="flex items-center gap-2 justify-between px-5">
                      <div className="flex items-center justify-center gap-2">
                        <FilePen className="h-4 w-4" />
                        <span>Asignaciones: {student.assignments.length}</span>
                      </div>

                      {student.assignments.length === 0 ? (
                        <Button size={"sm"} disabled>
                          Ver
                        </Button>
                      ) : (
                        <Link href="/asignaciones">
                          <Button size={"sm"}>Ver</Button>
                        </Link>
                      )}
                    </div>

                    {/* Llamados de atencion */}
                    <div className="flex items-center gap-2 justify-between px-5">
                      <div className="flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Llamados de atencion: {student.atention.length}
                        </span>
                      </div>

                      {student.atention.length === 0 ? (
                        <Button
                          size={"sm"}
                          disabled={student.atention.length === 0}
                        >
                          Ver
                        </Button>
                      ) : (
                        <Modal
                          // Este trigger es el qeu causa el error de hidration ya que por dentro del triger es un button
                          // Una solucion seria estilar un div y darle los estilos del Button
                          trigger={<Button size={"sm"}>Ver</Button>}
                          title="Conducta"
                          icon={<AlertCircle />}
                          content={
                            <div className="w-full flex flex-col gap-2">
                              <span>{student.name}</span>
                              
                                <AtentionForm items={student.atention} />
                            </div>
                          }
                          form
                        />
                      )}
                    </div>

                    {/* Ruta */}
                    <div className="flex items-center gap-2 justify-between px-5">
                      <div className="flex items-center justify-center gap-2">
                        <Route className="h-4 w-4" />
                        <span>Ruta: {student.route.name}</span>
                      </div>
                      {/* La ruta es obligatoria por eso nunca puede estar desabilitado */}

                      <Modal
                          // Este trigger es el qeu causa el error de hidration ya que por dentro del triger es un button
                          // Una solucion seria estilar un div y darle los estilos del Button
                          trigger={
                            <Button size={"sm"}>Ver</Button>}
                          title={student.route.name}
                          icon={<Route />}
                          content={
                            <div className="w-full flex flex-col gap-2">
                              <span>{student.name}</span>
                              <Card className="relative flex flex-col items-center justify-center gap-4 w-full h-56 transition-all ease-in-out duration-300 p-4">
                                <Image
                                fill
                                referrerPolicy="no-referrer"
                                src="/EjemploRuta.png"
                                alt="Ruta"
                                priority={true}
                                className="object-cover"
                                />
                              </Card>
                            </div>
                          }
                        />
                    </div>

                    {/* Encargado */}
                    <div className="flex items-center gap-2 justify-between px-5">
                      <div className="flex items-center justify-center gap-2">
                        <VscPerson className="h-4 w-4" />
                        <span>Encargado</span>
                      </div>

                      <span>{student.parent.name}</span>
                    </div>
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
