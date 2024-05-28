"use client";

import Image from "next/image";
import UserNav from "../userNav";
import UserNotification from "../userNotification";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { FilePen, Book, Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const navItems = [
  {
    name: "Estudiantes",
    href: "/estudiantes",
    class: "w-5 md:w-7 h-5 md:h-7",
    icon: PiStudent,
  },
  {
    name: "Asignaciones",
    href: "/asignaciones",
    class: "w-4 md:w-6 h-4 md:h-6",
    icon: FilePen,
  },
  {
    name: "Clases",
    href: "/clases",
    class: "w-4 md:w-6 h-4 md:h-6",
    icon: Book,
  },
  {
    name: "Docentes",
    href: "/docentes",
    class: "w-5 md:w-7 h-5 md:h-7",
    icon: PiChalkboardTeacherLight,
  },
];

export default function NavbarMenu() {
  const pathname = usePathname();

  return (
    <nav className="h-14 z-50 border-b border-slate-200 fixed w-full flex items-center justify-between gap-2 px-1 md:px-5 text-center">
      <div className="flex items-center justify-center gap-2">
        <Link href="/menu">
          <div className="relative h-10 w-10">
            <Image
              fill
              referrerPolicy="no-referrer"
              src="/logoX.svg"
              alt="Logo del instituto"
              priority={true}
            />
          </div>
        </Link>

        {/* Movile sidebar */}
        <Sheet>
          <SheetTrigger className="block sm:hidden">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-full md min-[300px]:w-auto">
            <SheetHeader className="pt-3">
              <SheetTitle>Nombre del instituto</SheetTitle>
            </SheetHeader>

            <div
              className={cn(
                "w-full items-center justify-around gap-4 text-sm font-semibold mt-4 flex flex-col"
              )}
            >
              {navItems.map((item, index) => (
                // Al dar click en el elemento, se cierra el sidebar
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex w-full gap-2 hover:bg-slate-200 hover:px-2 hover:py-1 rounded-md transition-all duration-300 ease-in-out",
                    pathname === item.href &&
                      "bg-slate-200 px-2 py-1 rounded-md transition-all duration-300 ease-in-out"
                  )}
                >
                  <SheetClose className="flex items-center gap-2 w-full">
                    <item.icon className={item.class} />
                    <span>{item.name}</span>
                  </SheetClose>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <span
        className={cn(
          "text-4xl font-semibold truncate",
          pathname === "/menu" ? "hidden sm:block" : "hidden"
        )}
      >
        Nombre del instituto
      </span>

      <div
        className={cn(
          "w-full items-center justify-around gap-2 text-base md:text-lg font-semibold",
          pathname === "/menu" ? "hidden " : "hidden sm:flex"
        )}
      >
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center justify-center gap-2 hover:bg-slate-200 hover:px-2 hover:py-1 rounded-md transition-all duration-300 ease-in-out",
              pathname === item.href &&
                "bg-slate-200 px-2 py-1 rounded-md transition-all duration-300 ease-in-out"
            )}
          >
            <item.icon className={item.class} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <UserNotification />
        <UserNav />
      </div>
    </nav>
  );
}
