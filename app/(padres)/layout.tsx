import NavbarMenu from "@/components/padres/navbarMenu";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <NavbarMenu />
      <main className="pt-14 px-3 md:px-5 h-svh">{children}</main>
    </div>
  );
}
