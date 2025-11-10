'use client';


import SidebarItem from "./SidebarItem";
import { IoCloseOutline, IoPersonOutline, IoSearchOutline, IoHomeOutline, IoBusinessOutline, IoDiamondOutline, IoMapOutline,IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline, IoBarChartOutline } from "react-icons/io5"
import { ThemeSwitch } from "@/context/ThemeSwitsh";
import { useUIStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { IoAlbumsOutline } from "react-icons/io5";


const Sidebar = () => {


  const isSidemenuOpen = useUIStore((state) => state.isSidemenuOpen);
  const closeSidemenu = useUIStore((state) => state.closeSidemenu);
  return (
    <div className="md:hidden">

      {
        isSidemenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )
      }

      {
        isSidemenuOpen && (
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs" />
        )
      }


      <nav className={
        clsx(
          "fixed p-3 right-0 top-0 w-[80%] h-screen bg-bg-l dark:bg-bg-d z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSidemenuOpen,
          }
        )
      }>


        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSidemenu}
        />

        <div className="relative mt-12">

          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />
          <input
            type="text"
            placeholder="Suche..."
            className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />

        </div>




        <SidebarItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} className="mr-2" />}>Auf Karte erkunden</SidebarItem>
        <SidebarItem href="/kategorie/wohnung" icon={<IoHomeOutline size={20} className="mr-2" />}>Wohnung</SidebarItem>
        <SidebarItem href="/kategorie/haus" icon={<IoBusinessOutline size={20} className="mr-2" />}>Haus</SidebarItem>
        <SidebarItem href="/kategorie/luxus" icon={<IoStarOutline size={20} className="mr-2" />}>Luxus</SidebarItem>
        <SidebarItem href="/kategorie/alle-immobilien" icon={<IoAlbumsOutline size={20} className="mr-2" />}>Alle Immobilien</SidebarItem>
        <SidebarItem href="/immobilien-bewerten" icon={<IoBarChartOutline size={20} className="mr-2" />}>Immobilien bewerten</SidebarItem>
        <SidebarItem href="/dienstleistungen" icon={<IoBriefcaseOutline size={20} className="mr-2" />}>Dienstleistungen</SidebarItem>
        <SidebarItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} className="mr-2" />}>Über uns</SidebarItem>
        <SidebarItem href="/kontakt" icon={<IoMailOutline size={20} className="mr-2" />}>Kontakt</SidebarItem>
        <SidebarItem href="/blog" icon={<IoDiamondOutline size={20} className="mr-2" />}>Blog</SidebarItem>

        <div className="flex py-1 mt-3 justify-start items-center hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded">
          <ThemeSwitch />
        </div>

      </nav>
    </div>
  )
}

export default Sidebar
