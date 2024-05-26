import NavbarMenu from "@/components/padres/navbarMenu";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <NavbarMenu />
      <main className="pt-24 px-1 md:px-5">{children}</main>
    </div>
  );
}
