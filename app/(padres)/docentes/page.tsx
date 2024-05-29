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
import { Input } from "@/components/ui/input";
import { infoStudents } from "@/lib/dataStudents";
import { infoTeachers } from "@/lib/dataTeachers";
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
import { useState } from "react";

export default function DocentesPage() {
  const router = useRouter();

  // Informacion de los maestros
  const teachers = infoTeachers

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
        <div className="w-full flex items-center justify-between gap-2 px-1">
          <Input type="search" className="w-[80%] h-8" />
          <span>Docentes: {teachers.length}</span>
        </div>
        <section className="flex flex-col items-center justify-center gap-2 w-full">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <Card key={teacher.id} className="w-full hover:bg-slate-100 flex items-center justify-between p-2">
                <span>
                {teacher.name}
                  </span>
                  <Button size={'sm'}>
                    Ver
                  </Button>
              </Card>
            ))) : 'No hay docentes asignados'}
        </section>
      </div>
    </div>
  );
}
