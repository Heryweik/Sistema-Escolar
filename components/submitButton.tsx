import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton() {

    // simular un tiempo de envio del formulario para probar el loader
    
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