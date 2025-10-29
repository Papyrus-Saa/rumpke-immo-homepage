import { ThemeSwitch } from '@/context/ThemeSwitsh'
import Link from 'next/link'
import { IoSearchOutline } from 'react-icons/io5'


const TopMenu = () => {
  return (
    <nav className='flex justify-between items-center sm:py-10 '>

      <div className=''>
        <Link
          href={'/'}>
          Logo
        </Link>
      </div>

      <div className=' hidden sm:block'>

        <Link className="m-2 p-2 rounded-md transition-all duration-300 ease-out text-xs hover:bg-Bghover-l dark:hover:bg-Bghover-d" href={'/object/wohnungen'}>
          Wohnung
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all duration-300 ease-out text-xs hover:bg-Bghover-l dark:hover:bg-Bghover-d" href={'/object/haus'}>
          Haus
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all duration-300 ease-out text-xs hover:bg-Bghover-l dark:hover:bg-Bghover-d" href={'/object/luxus'}>
          Luxus
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all duration-300 ease-out text-xs hover:bg-Bghover-l dark:hover:bg-Bghover-d" href={'/object/auf-karte-erkunden'}>
          Auf Karte erkunden
        </Link>

        <ThemeSwitch />
      </div>
      <div className='flex items-center justify-center gap-2 bg-primary dark:bg-primary-dark px-2 text-white transition-all duration-300 ease-out rounded-md md:h-8'>
        <Link href={'/suchen'} className='flex items-center justify-center p-2 cursor-pointer text-xs'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <span className='flex items-center justify-center text-lg  mx-2'>|</span>
        <button className='flex items-center justify-center p-2 cursor-pointer text-xs'>
          Menü
        </button>
      </div>

    </nav>
  )
}

export default TopMenu
