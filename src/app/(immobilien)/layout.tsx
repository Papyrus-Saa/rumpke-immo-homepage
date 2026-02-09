'use client';


import { Inter } from "next/font/google";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import SidebarDesktop from "@/components/ui/sidebar/SidebarDesktop";
import { Title } from "@/components/ui/title/Title";
import Topmenu from "@/components/ui/top-menu/TopMenu";
import Footer from "@/components/ui/footer/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });


export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <div className="">
        <div className="">
          {/* <div className="flex">
            <SidebarDesktop />
            <Topmenu />
          </div> */}
          {/* <Title
            title="Rumpke Immobilien"
            subtitle="Finde deine Traumimmobilie"
            className='flex-1 md:hidden mb-4 ml-2 text-primary'
          /> */}
          {/* <Sidebar /> */}
          <div className="">
            {children}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
