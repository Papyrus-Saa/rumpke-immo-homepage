'use client';



import SidebarItem from "./SidebarItem";
import { IoPersonOutline, IoHomeOutline, IoBusinessOutline, IoDiamondOutline, IoMapOutline, IoLogInOutline, IoLogOutOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline, IoBarChartOutline } from "react-icons/io5"
import { ThemeSwitch } from "@/context/ThemeSwitsh";





const SidebarDesktop = () => {


  return (

    <nav className="hidden md:block  h-screen sticky top-0">

      <SidebarItem href="/" icon={<IoPersonOutline size={20} />} >Profil</SidebarItem>
      <SidebarItem href="/object/wohnung" icon={<IoHomeOutline size={20} />} >Wohnung</SidebarItem>
      <SidebarItem href="/object/haus" icon={<IoBusinessOutline size={20} />} >Haus</SidebarItem>
      <SidebarItem href="/object/luxus" icon={<IoStarOutline size={20} />} >Luxus</SidebarItem>
      <SidebarItem href="/object/auf-karte-erkunden" icon={<IoMapOutline size={20} />} >Auf Karte erkunden</SidebarItem>
      <SidebarItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} />} >Über uns</SidebarItem>
      <SidebarItem href="/kontakt" icon={<IoMailOutline size={20} />} >Kontakt</SidebarItem>
      <SidebarItem href="/immobilien-bewerten" icon={<IoBarChartOutline size={20} />} >Immobilien bewerten</SidebarItem>
      <SidebarItem href="/dienstleistungen" icon={<IoBriefcaseOutline size={20} />} >Dienstleistungen</SidebarItem>

      <div className="flex flex-col justify-end ">
        <SidebarItem href="/auth/anmelden" icon={<IoLogInOutline size={20} className="text-primary" />}>Anmelden</SidebarItem>
        <SidebarItem href="/auth/abmelden" icon={<IoLogOutOutline size={20} className="text-red-600" />}>Abmelden</SidebarItem>
        <div className="flex py-2 justify-start items-center hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded">
          <ThemeSwitch />
        </div>
      </div>

    </nav>

  )
}

export default SidebarDesktop;
