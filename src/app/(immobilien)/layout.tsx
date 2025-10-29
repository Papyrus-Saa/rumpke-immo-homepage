import BottomMenu from "@/components/ui/bottom-menu/BottomMenu";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function PropertiesLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="xl:px-20">
      <TopMenu/>
      {/* <span className="border-l-4 px-2 border-primary dark:border-primary-dark">Rumpke Immobilien</span> */}
      {children}
      <BottomMenu/>
    </main>
  );
}
