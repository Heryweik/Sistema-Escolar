import Image from "next/image";
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi";
import { FilePen, Book } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export const itemMenu = [
  {
    title: "Estudiantes",
    link: "/estudiantes",
    icon: PiStudent,
  },
  {
    title: "Asignaciones",
    link: "/asignaciones",
    icon: FilePen,
  },
  {
    title: "Clases",
    link: "/clases",
    icon: Book,
  },
  {
    title: "Docentes",
    link: "/docentes",
    icon: PiChalkboardTeacherLight,
  },
];

export default function MenuPage() {
  return (
    <div className="flex flex-col items-center py-10 md:py-20 h-full relative overflow-y-auto"> {/* Este h-full esta rompiendo la UI, era el justify-center xD */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="fixed h-[70%] w-[70%]">
          <Image
            fill
            referrerPolicy="no-referrer"
            src="/logoXFondo.svg"
            alt="Logo del instituto"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 md:gap-20 justify-center z-10 max-w-4xl  text-center"> {/* mt-80 md:mt-0 */}
        <h1 className="text-3xl font-semibold">Bienvenido Nombre del padre</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-14 md:gap-24 w-full">
          {itemMenu.map((item, index) => (
            <Link key={index} href={item.link}>
              <Card className="hover:bg-slate-100 flex flex-col items-center justify-center gap-4 w-full md:w-80 h-28 sm:h-40 md:h-52 transition-all ease-in-out duration-300 shadow-md">
                  <item.icon className="w-9 sm:w-14 h-9 sm:h-14" />
                  <span className="font-medium text-base  sm:text-xl">{item.title}</span>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
