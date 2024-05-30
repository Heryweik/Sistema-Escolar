"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { infoTeachers } from "@/lib/dataTeachers";
import { Book, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PiChalkboardTeacherLight } from "react-icons/pi";

export default function DocentesPage() {
  const router = useRouter();

  // Informacion de los maestros
  const teachers = infoTeachers;

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
          <h1 className="text-3xl font-semibold">Docentes</h1>
          <div className="w-8"></div>
        </div>
        <Command className="">
          <div className="w-full flex items-center justify-between gap-2 mb-10 text-base">
            <CommandInput placeholder="Nombre del docente..." />
            <span>Docentes: {teachers.length}</span>
          </div>
          <CommandList>
            {teachers.length === 0 ? (
              <CommandEmpty className="text-base">No hay docentes</CommandEmpty>
            ) : (
              <CommandEmpty className="text-base">Este docente no existe</CommandEmpty>
            )}
            {/* Al momento de cargar los docentes debe de aparecer un loader o un skeleton, esto mismo se aplicario para todas las partes en las que recibe informacion del server */}
            {teachers.map((teacher) => (
              <CommandItem key={teacher.id} className="mb-2 flex items-center justify-between p-1 w-full text-base border border-slate-200 rounded-md">
                <span>{teacher.name}</span>

                {/* Modal de la asignacion */}
                <Modal
                          trigger={
                            <div className="button-default-watch">
                              Ver
                            </div>
                          }
                          title={teacher.name}
                          icon={<PiChalkboardTeacherLight />}
                          content={
                            <Card className="relative flex flex-col items-center justify-center gap-2 w-full h-auto transition-all ease-in-out duration-300 p-4">
                                <span className="w-full text-left">
                                  Clases:
                                </span>
                                {teacher.classes.map((clase) => (
                                  <div
                                    key={clase.id}
                                    className="flex items-center gap-2 justify-between border border-slate-200 rounded-md p-1 hover:bg-slate-100 w-full"
                                  >
                                    <div className="flex items-center justify-center gap-2">
                                      <Book className="h-4 w-4" />
                                      <span>{clase.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </Card>
                          }
                          
                        />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
