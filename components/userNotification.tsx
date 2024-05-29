"use client";

import { Bell, DoorClosed, FilePen, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { infoStudents } from "@/lib/dataStudents";
import { space } from "postcss/lib/list";
import { Span } from "next/dist/trace";

export default function UserNotification() {

  // Informacion de los estudiantes
  const students = infoStudents;

  // Cantidad de asignaciones en total de todos los estudiantes
  const totalAsigments = students.reduce(
    (acc, student) => acc + student.assignments.length,
    0
  );

  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full relative"
        >
          <FilePen className="w-7 h-7 " />
          <span className="absolute right-0 top-0 border border-slate-900 rounded-full w-5 h-5 p-1 bg-white text-xs grid place-content-center">
            {totalAsigments}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* leading-none sirve para que el texto no tenga espacio entre lineas */}
            <p className="text-base text-center font-medium leading-none truncate">
              Asignaciones de los estudiantes
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="grid items-start gap-2">
          {students.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <div
                className={
                  "w-full flex flex-col items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold"
                }
              >
                <div className="w-full flex gap-2">
                  <span>
                    <User className="w-4 h-4" />
                  </span>
                  {item.name}
                </div>

                {item.assignments.length === 0 && <span>No hay asignaciones</span>}

                {item.assignments.map((asignacion, index) => (
                  <Link
                    key={index}
                    href={'/asignaciones'}
                    className={cn(
                      "flex items-center w-full gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() => {
                      // Guardamos el id del estudiante en el localStorage
                      localStorage.setItem("studentId", item.id.toString());
                      // Refrescamos la pagina si estamos en la pagina de asignaciones para que se renderize de nuevo la UI
                      if (pathname === '/asignaciones') window.location.reload();
                    }}
                  >
                    <span>
                      <FilePen className="w-4 h-4" />
                    </span>
                    {asignacion.name}
                  </Link>
                ))}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
