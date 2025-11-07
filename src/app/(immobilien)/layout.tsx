

import Footer from "@/components/ui/footer/Footer";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import SidebarDesktop from "@/components/ui/sidebar/SidebarDesktop";
import { Title } from "@/components/ui/title/Title";

import Topmenu from "@/components/ui/top-menu/TopMenu";





export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">
        <div className="">
          <Topmenu />
        </div>

        <div className="px-4">
          <Title
            title="Rumpke Immobilien"
            subtitle="Finde deine Traumimmobilie"
            className='flex-1 md:hidden text-primary mb-4 ml-2'
          />
          <Sidebar />
          <div className="flex">
            <SidebarDesktop />
            <div className="flex-1">
              {children}
            </div>
          </div>
            <Footer/>
        </div>
      </div>
    </>
  );
}
