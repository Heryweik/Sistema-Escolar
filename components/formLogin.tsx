"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submitButton";

const FormSchema = z.object({
  email: z.string().email({
    message: "Correo invalido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),
});

export default function FormLogin() {
  // Formulario de inicio de sesión, usamos useForm para manejar el estado del formulario, y zodResolver para validar los datos del formulario.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función que se ejecuta al enviar el formulario.
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Inicio de sesion exitoso",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Ejemplo de como mandar la informacion a las actions que se crearon en el proyecto.
  /* async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await postDataHandler(data);
      // Mostrar toast de exito
      toast({
        title: "Inicio de sesion exitoso",
        description: "Has iniciado sesion correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesion",
        description: error.message,
      });
    }
  } */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 ">
        <FormField
          // Controla el campo email del formulario.
          control={form.control}
          // Nombre del campo, debe coincidir con el nombre del campo en FormSchema y asi se aplican las validaciones.
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ejemplo@gmail.com"
                  {...field}
                  type="email"
                  // field es el objeto que contiene el valor del campo, y onChange es la función que actualiza el valor del campo.
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                className=""
                  placeholder="contraseña"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit" className="w-full flex gap-2">
          Iniciar sesion
          <Loader2 className={cn("animate-spin")} />
        </Button> */}
        <SubmitButton />
      </form>
    </Form>
  );
}
