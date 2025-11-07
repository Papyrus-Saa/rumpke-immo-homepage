'use client'


import { useUIStore } from '@/store/ui/ui-store'
import { RumpkeLogo } from '@/components/ui/logo/RumpkeLogo'
import Link from 'next/link'
import CategoryButton from '../category-button/CategoryButton'



const Topmenu = () => {

  const openSidemenu = useUIStore((state) => state.openSidemenu);
  return (

    <>
      <div className='flex justify-between items-center md:mb-8 py-2'>
        <Link href={'/'}>
          <div className="w-40 h-10 sm:w-65 sm:h-25 flex items-center">
            <RumpkeLogo className="w-full h-full" aria-label="Rumpke Immobilien Logo" />
          </div>
        </Link>

        <div className='flex'>
          <CategoryButton
            name="Kauf"
            href="/kauf"
            color="border-btn-buy hover:bg-btn-buy hover:text-white mr-1"
          />
          <CategoryButton
            name="Miete"
            href="/miete"
            color="border-btn-rent hover:bg-btn-rent hover:text-white mr-1"
          />

          <div className='flex items-center justify-center transition-all duration-300 ease-out rounded-md md:h-8 '>
            <button
              onClick={openSidemenu}
              className='mx-2 md:hidden cursor-pointer'>
              Menü
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Topmenu
