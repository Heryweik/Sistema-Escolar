import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Iniciando
        </Button>
      ) : (
          <Button type="submit" className="w-full">
            Iniciar sesion
          </Button>
      )}
    </>
  );
}

export function FormButton({ name }: { name: string }) {

  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Enviando
        </Button>
      ) : (
          <Button type="submit">
            {name}
          </Button>
      )}
    </>
  );
}
