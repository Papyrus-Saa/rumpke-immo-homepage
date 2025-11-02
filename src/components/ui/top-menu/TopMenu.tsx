'use client'


import { useUIStore } from '@/store/ui/ui-store'
import Image from 'next/image'
import Link from 'next/link'



const Topmenu = () => {

  const openSidemenu = useUIStore((state) => state.openSidemenu);
  return (

    <>
      <div className='flex justify-between items-center p-2  mb-8 sm:mb-14'>
        <Link href={'/'}>
          <div className="relative w-[140px] h-[70px] sm:w-40 sm:h-20 md:w-[170px] md:h-[130px] lg:w-[220px] lg:h-20">
            <Image
              src="/imgs/logo-rumpke.png"
              alt="Rumpke Immobilien Logo"
              fill
              priority
              sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, (max-width: 1024px) 260px, 320px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className='flex items-center justify-center transition-all duration-300 ease-out rounded-md md:h-8 '>
          <button
            onClick={openSidemenu}
            className='mx-2 md:hidden cursor-pointer'>
            Menü
          </button>
        </div>
      </div>

    </>
  )
}

export default Topmenu
