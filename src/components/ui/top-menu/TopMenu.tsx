'use client'


import { useUIStore } from '@/store/ui/ui-store'

import { RumpkeLogo } from '@/components/ui/logo/RumpkeLogo'
import Link from 'next/link'

import { IoMenuOutline } from 'react-icons/io5';
import CategoryButton from '../category-button/CategoryButton';


const Topmenu = () => {

  const openSidemenu = useUIStore((state) => state.openSidemenu);


  return (
    <>
      <div className='relative mb-10 sm:mb-0 flex justify-between items-center md:mb-4 py-4 px-4 '>
        <Link href={'/'}>
          <div className="flex items-center">
            <RumpkeLogo className="md:w-full md:h-full" aria-label="Rumpke Immobilien Logo" />
          </div>
        </Link>

        <div className='flex'>
          <CategoryButton
            name="Kauf"
            href="/kauf"
            color="border-buy"
            className="hover:bg-buy hover:text-white mr-1"
          />
          <CategoryButton
            name="Miete"
            href="/miete"
            color="border-rent"
            className="hover:bg-rent hover:text-white mr-1"
          />

          <div className='flex items-center justify-center transition-all duration-300 ease-out rounded-md md:h-8 '>
            <button
              onClick={openSidemenu}
              className='mx-2 md:hidden p-1 rounded cursor-pointer hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition'>
              <IoMenuOutline size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topmenu
