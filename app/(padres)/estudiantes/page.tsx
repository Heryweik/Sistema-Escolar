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
  Loader2,
  Route,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VscPerson } from "react-icons/vsc";
import Image from "next/image";
import { AtentionForm } from "@/components/padres/atentionForm";
import { useState } from "react";
import { infoStudents } from "@/lib/dataStudents";

export default function EstudiantesPage() {
  const router = useRouter();

  // Informacion de los estudiantes
  const students = infoStudents;

  // Estado para controlar el acordeón activo
  // Esto servira para cuando se necesite que un acordeon en especifico este abierto al redirigir desde otra pagina

  //Obtenemos id del estudiante desde localStorage
  const studentId = localStorage.getItem("studentId");

  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    students.length > 0
      ? `estudiante-${studentId ? studentId : students[0].id}`
      : null
  );

  // otro ejemplode como se podria hacer la peticion a la API
  // Condumir action para obtener la informacion de los estudiantes
  /* async function getStudents() {
    // Aquí se haría la petición a la API para obtener la información de los estudiantes
    const data = await fetch("/api/students");
    const students = await data.json();
    return students;
  }
 */

  // Llamamos a la funcion para obtener la informacion de los estudiantes, este se ejecutara solo una vez al cargar la pagina
  /* useEffect(() => {
    getStudents();
  }, []); */

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
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={activeAccordion ?? ""}
            onValueChange={(value) => setActiveAccordion(value)}
          >
            {/* Mostrar loader mientras se obtiene la informacion de los estudiantes */}
            {/* {students ? (
              "Aqui iria todo el codigo de abajo que genera los acordeones"
            ) : (
              <Loader2 className="h-10 w-10 animate-spin" />
            )} */}

            {
              /* students.length <= 3 */ !students && (
                <div className="w-full h-full grid place-content-center">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
              )
            }

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
                    Curso: {student.course}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="overflow-x-auto">
                  <div className="flex flex-col w-full gap-2 px-5">
                    {/* Clases */}
                    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 hover:bg-slate-100">
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
                    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 hover:bg-slate-100">
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
                    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 hover:bg-slate-100">
                      <div className="flex items-center justify-center gap-2 ">
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
                          trigger={
                            <div className="button-default-watch">Ver</div>
                          }
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
                    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 hover:bg-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <Route className="h-4 w-4" />
                        <span>Ruta: {student.route.name}</span>
                      </div>
                      {/* La ruta es obligatoria por eso nunca puede estar desabilitado */}

                      <Modal
                        trigger={
                          <div className="button-default-watch">Ver</div>
                        }
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
                    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 py-3 hover:bg-slate-100">
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
