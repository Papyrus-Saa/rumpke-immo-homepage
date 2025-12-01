'use client'


import Link from 'next/link'



const page = () => {


  return (
    <div >
      <Link href="/admin/properties">
        <button type="button" className="text-xs cursor-pointer text-primary hover:underline">
          Zurück zur Immobilienübersicht
        </button>
      </Link>
    </div>
  )
}

export default page
