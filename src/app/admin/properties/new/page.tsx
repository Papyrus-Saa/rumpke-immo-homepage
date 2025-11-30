'use client'

import PropertyFormBlock1 from '@/components/properties/PropertyFormBlock1'
import Link from 'next/link'



const page = () => {


  return (
    <div >
      <Link href="/admin/properties">
        <button type="button" className="text-xs cursor-pointer text-primary hover:underline">
          Zurück zur Immobilienübersicht
        </button>
      </Link>
      <PropertyFormBlock1 />
    </div>
  )
}

export default page
