import Login from "@/components/login";


export default function Home() {
  return (
    <main className="flex min-h-svh mx-auto items-center">
      <section className="w-[35%] h-svh bg-slate-900 hidden md:grid place-content-center overflow-hidden">
        <span className="uppercase text-slate-600 text-6xl text-center font-bold tracking-widest leading-relaxed">
          Nombre del instituto
        </span>
      </section>
      <section className="w-full md:w-[65%] min-h-svh grid place-content-center">
        <Login />
      </section>
    </main>
  );
}
