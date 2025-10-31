

import Sidebar from "@/components/ui/sidebar/Sidebar";
import SidebarDesktop from "@/components/ui/sidebar/SidebarDesktop";
import { Title } from "@/components/ui/title/Title";
import CategoryButton from "@/components/ui/category-button/CategoryButton";
import Topmenu from "@/components/ui/top-menu/TopMenu";





export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">
        <div className="">
          <Topmenu />
        </div>

        <div className="px-4">
          <div className="flex items-center gap-4 mb-14">
            <Title
              title="Immobilien"
              subtitle="Finde deine Traumimmobilie"
              className='flex-1'
            />
            <CategoryButton
              name="Kauf"
              href="/kauf"
              color="border-btn-buy hover:bg-btn-buy hover:text-white"
            />
            <CategoryButton
              name="Miete"
              href="/miete"
              color="border-btn-rent hover:bg-btn-rent hover:text-white"
            />
          </div>
          <Sidebar />
          <div className="flex">
            <SidebarDesktop />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
