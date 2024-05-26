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

export const bellItems = [
  {
    name: "Nombre del estudiante",
    icon1: User,
    icon2: FilePen,
    asignacion: [
      {
        name: "Nueva asignación de la clase XXXXX",
        href: "/asignaciones",
      },
      {
        name: "Nueva asignación de la clase XXXXX",
        href: "/asignaciones",
      },
    ],
  },
  {
    name: "Nombre del estudiante",
    icon1: User,
    icon2: FilePen,
    asignacion: [
      {
        name: "Nueva asignación de la clase XXXXX",
        href: "/asignaciones",
      },
      {
        name: "Nueva asignación de la clase XXXXX",
        href: "/asignaciones",
      },
    ],
  },
  {
    name: "Nombre del estudiante",
    icon1: User,
    icon2: FilePen,
    asignacion: [
      {
        name: "Nueva asignación de la clase XXXXX",
        href: "/asignaciones",
      },
      {
        name: "Nueva asignación de la clase XXXXX asdasd asd as d ",
        href: "/asignaciones",
      },
    ],
  },
];

export default function UserNotification() {
  // Obtenemos la primera letra del nombre para mostrarla en el avatar si no hay imagen o no la ha cargado
  /* const fisrtLetter = name.charAt(0).toUpperCase(); */

  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full relative"
        >
          <Bell className="w-7 h-7 " />
          <span className="absolute right-0 top-0 border border-slate-900 rounded-full w-5 h-5 p-1 bg-white text-xs grid place-content-center">
            2
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
          {bellItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <div
                className={
                  "w-full flex flex-col items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold"
                }
              >
                <div className="w-full flex gap-2">
                  <span>
                    <item.icon1 className="w-4 h-4" />
                  </span>
                  {item.name}
                </div>

                {item.asignacion.map((asignacion, index) => (
                  <a
                    key={index}
                    href={asignacion.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      // los && son para aplicar una clase si se cumple la condición
                      pathname === asignacion.href &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <span>
                      <item.icon2 className="w-4 h-4" />
                    </span>
                    {asignacion.name}
                  </a>
                ))}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
