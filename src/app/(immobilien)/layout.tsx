'use client';


import { Inter } from "next/font/google";
import Footer from "@/components/ui/footer/Footer";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import SidebarDesktop from "@/components/ui/sidebar/SidebarDesktop";
import { Title } from "@/components/ui/title/Title";
import Topmenu from "@/components/ui/top-menu/TopMenu";

const inter = Inter({ subsets: ["latin"], display: "swap" });


export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <div className="">
        <div className="">
          <Topmenu />
        </div>

        <div className="md:px-4">
          <Title
            title="Rumpke Immobilien"
            subtitle="Finde deine Traumimmobilie"
            className='flex-1 md:hidden mb-4 ml-2 text-primary'
          />
          <Sidebar />
          <div className="flex">
            <SidebarDesktop />
            <div className="flex-1 max-w-[1300px] mx-auto">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
