"use client";

import { CreditCard, DoorClosed, Home, Settings, User } from "lucide-react";
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

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Modal from "./modal";

export default function UserNav() {
  // Obtenemos la primera letra del nombre para mostrarla en el avatar si no hay imagen o no la ha cargado
  let name = "Shad";
  const fisrtLetter = name.charAt(0).toUpperCase();

  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{fisrtLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* leading-none sirve para que el texto no tenga espacio entre lineas */}
            <p className="text-sm font-medium leading-none truncate">
              Nombre del usuario
            </p>
            <p className="text-xs text-muted-foreground  truncate">@Correo</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="grid items-start gap-2">
          <DropdownMenuItem asChild>

            {/* <div> */}
            <Modal
              trigger={
                <div
                  className={cn(
                    "group w-full flex flex-row justify-between items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Estado de cuenta
                  <span>
                    <User className="w-4 h-4" />
                  </span>
                </div>
              }
              title="Estado de cuenta"
              content={
                <div className="w-full flex flex-col">
                  <span>Nombre del padre</span>
                  <span>Pago: Pendienta a realizar</span>
                </div>
              }
            />
            {/* </div> */}

          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full flex justify-between items-center hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <div>
            Salir
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
