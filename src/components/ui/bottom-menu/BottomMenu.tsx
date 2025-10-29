import Link from "next/link"


const BottomMenu = () => {
  return (
    <nav className="hidden sm:flex fixed bottom-0 right-1/2 transform translate-x-1/2">

      <Link className="m-2 p-2  text-xs" href={'/dienstleistungen'}>
        Dienstleistungen
      </Link>
      <Link className="m-2 p-2  text-xs" href={'/blog'}>
        Blog
      </Link>
      <Link className="m-2 p-2  text-xs" href={'/ueber-uns'}>
        Über uns
      </Link>
      <Link className="m-2 p-2  text-xs" href={'/immobilien-bewerten'}>
        Immobilienbewertung
      </Link>
      <Link className="m-2 p-2  text-xs" href={'/kontakt'}>
        Kontakt
      </Link>

    </nav>
  )
}

export default BottomMenu
