"use client";

import Image from "next/image";
import UserNav from "../userNav";
import UserNotification from "../userNotification";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { FilePen, Book } from "lucide-react";
import Link from "next/link";

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
    <nav className="h-14 border-b border-slate-200 fixed w-full flex items-center justify-between gap-2 px-1 md:px-5 text-center">
      <Link href="/menu">
        <div className="relative h-10 w-10">
          <Image
            fill
            referrerPolicy="no-referrer"
            src="/logoX.svg"
            alt="Logo del instituto"
          />
        </div>
      </Link>

      <span
        className={cn(
          " text-2xl md:text-4xl font-semibold",
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
            className="flex items-center justify-center gap-2"
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
