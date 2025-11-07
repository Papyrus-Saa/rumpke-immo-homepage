'use client';



import SidebarItem from "./SidebarItem";
import { IoPersonOutline, IoHomeOutline, IoBusinessOutline, IoDiamondOutline, IoMapOutline, IoLogInOutline, IoLogOutOutline, IoChatbubbleEllipsesOutline, IoBriefcaseOutline, IoStarOutline, IoMailOutline, IoBarChartOutline, IoAlbumsOutline } from "react-icons/io5"
import { ThemeSwitch } from "@/context/ThemeSwitsh";
import { Title } from "../title/Title";



const SidebarDesktop = () => {


  return (

    <nav className="hidden md:block  h-screen sticky top-0 px-2 py-6">

      <Title
        title="Rumpke Immobilien"
        subtitle="Finde deine Traumimmobilie"
        className='flex-1 text-primary mb-14'
      />

      <SidebarItem href="/" icon={<IoPersonOutline size={20} />} >Profil</SidebarItem>
      <SidebarItem href="/auf-karte-erkunden" icon={<IoMapOutline size={20} />} >Auf Karte erkunden</SidebarItem>
      <SidebarItem href="/kategorie/wohnung" icon={<IoHomeOutline size={20} />} >Wohnung</SidebarItem>
      <SidebarItem href="/kategorie/haus" icon={<IoBusinessOutline size={20} />} >Haus</SidebarItem>
      <SidebarItem href="/kategorie/luxus" icon={<IoStarOutline size={20} />} >Luxus</SidebarItem>
      <SidebarItem href="/kategorie/alle-immobilien" icon={<IoAlbumsOutline size={20} />} >Alle Immobilien</SidebarItem>
      <SidebarItem href="/immobilien-bewerten" icon={<IoBarChartOutline size={20} />} >Immobilien bewerten</SidebarItem>
      <SidebarItem href="/dienstleistungen" icon={<IoBriefcaseOutline size={20} />} >Dienstleistungen</SidebarItem>
      <SidebarItem href="/ueber-uns" icon={<IoChatbubbleEllipsesOutline size={20} />} >Über uns</SidebarItem>
      <SidebarItem href="/kontakt" icon={<IoMailOutline size={20} />} >Kontakt</SidebarItem>

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
