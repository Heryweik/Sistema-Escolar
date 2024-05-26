import Image from "next/image";
import FormLogin from "./formLogin";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-32 w-32">
        <Image
          fill
          referrerPolicy="no-referrer"
          src="/logoX.svg"
          alt="Logo del instituto"
        />
      </div>
      <span className="text-4xl font-semibold text-center">Inicio de sesion</span>
      
      <FormLogin />

      <span className="text-sm font-light text-slate-400 hover:underline tracking-wide cursor-pointer text-center">
        ¿Olvidaste tu contraseña?
      </span>
    </div>
  );
}
