"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUp, Loader2 } from "lucide-react";

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
import { FormButton, SubmitButton } from "../submitButton";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Card } from "../ui/card";
import { useState } from "react";

/* const FormSchema = z.object({
  document: z
    .custom<FileList>((val) => val instanceof FileList, "Sube un archivo")
    .refine((files) => files.length > 0, "Sube un archivo"),
}); */

const FormSchema = z.object({
  document: z
    .instanceof(File, { message: "Sube un archivo válido" })
    .refine(
      (file) =>
        file &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message:
          "Formato de archivo no válido. Solo se aceptan .pdf, .doc, .docx",
      }
    ),
});

export default function AsigmentForm({ description }: { description: string }) {
  // Estado para almacenar el nombre del archivo y asi verlo en el label
  const [fileName, setFileName] = useState<string | null>(null);

  // Estado para manejar el drag and drop
  const [dragOver, setDragOver] = useState<boolean>(false);

  // Formulario para entregar tareas
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      document: undefined,
    },
  });
  // Se ejecuta al enviar el formulario
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Subida de archivo exitosa",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {/* al enviar el documento solo se envia el nombre, esto es solo para demostracion, al final se debe de enviar toda la data para que se guarde el documento */}
            {JSON.stringify(data.document.name, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  // Función que se ejecuta al soltar un archivo en el label.
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      form.setValue("document", file);
    }
    setDragOver(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 "
      >
        <Card className=" flex flex-col items-center justify-center gap-4 w-full h-auto p-4">
          <span>{description}</span>
          <FormField
            // Controla el campo document del formulario.
            control={form.control}
            // Nombre del campo, debe coincidir con el nombre del campo en FormSchema y asi se aplican las validaciones.
            name="document"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  {/* 
                  Se quitaron estos campos del input
                {...field}
                  onChange={field.onChange} */}
                  <>
                    <Input
                      type="file"
                      className="hidden" // Ocultar el input de archivo por defecto
                      id="file-upload"
                      onChange={(e) => {
                        // Actualizar el valor del campo con el archivo seleccionado.
                        const file = e.target.files ? e.target.files[0] : null;
                        // Actualizar el estado con el nombre del archivo
                        setFileName(file ? file.name : null);
                        field.onChange(file);
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className={cn("w-full h-40 border-2 ring-0 border-dashed border-slate-300 flex items-center justify-center flex-col text-center cursor-pointer file:bg-gray-50 rounded-md",
                        dragOver && "bg-slate-100"
                      )}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => setDragOver(true)}
                      onDragLeave={() => setDragOver(false)}
                    >
                      {fileName ? (
                        // Muestra el nombre del archivo
                        <span className="text-slate-900">{fileName}</span>
                      ) : (
                        <>
                          <FileUp className="h-10 w-10 text-slate-400" />
                          <span className="text-slate-400">
                            Haz click para subir un archivo
                          </span>
                          {/* <span className="text-slate-400">(.pdf, .doc, .docx, etc)</span> */}
                        </>
                      )}
                    </label>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        {/* Parte del modal va aqui para que se pueda enviar el formulario */}
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
          <FormButton name="Enviar" />
        </DialogFooter>
      </form>
    </Form>
  );
}
