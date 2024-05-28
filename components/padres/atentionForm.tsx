"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, string, z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Card } from "../ui/card";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { FormButton, SubmitButton } from "../submitButton";

interface Item {
  id: number;
  name: string;
  course: string;
  class: string;
}

export function AtentionForm({ items }: { items: Item[] }) {

  // No se ocupa, en ves de esto se desactiva el botton
  const FormSchema = z.object({
    items: z.array(z.number()).refine((value) => value.some((item) => item), {
      message: "Selecciona al menos un llamado de atención.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <Card className=" flex flex-col items-center justify-center gap-4 w-full h-auto p-4">
              <FormItem className="w-full">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex w-full flex-row items-center justify-between gap-2 space-y-0"
                        >
                          <FormLabel className="text-sm font-normal text-black">
                            {item.name}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            </Card>
          )}
        />

        {/* Parte del modal va aqui para que se pueda enviar el formulario */}
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
          <FormButton name="Marcar como visto" />
        </DialogFooter>
      </form>
    </Form>
  );
}
