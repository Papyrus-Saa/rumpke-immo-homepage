import { IoMailOutline, IoCallOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";



const ContactAside = () => {
  return (
    <aside className="bg-primary dark:bg-primary-dark text-white rounded p-6 md:p-8 flex flex-col gap-4 md:gap-6 w-full h-full">
      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-2">
        <IoPersonOutline className="text-2xl" /> Rumpke Immobilien
      </h2>
      <div className="font-semibold mb-2">Ann-Christin Rumpke</div>
      <div className="flex items-center gap-2">
        <IoMailOutline className="text-lg" />
        <a href="mailto:info@rumpke-immobilien.de" className="underline hover:text-white/80">info@rumpke-immobilien.de</a>
      </div>
      <div className="flex items-center gap-2">
        <IoCallOutline className="text-lg" />
        <a href="tel:01723244468" className="underline hover:text-white/80">0172 – 32 444 68</a>
      </div>
      <div className="flex items-center gap-2">
        <IoCallOutline className="text-lg" />
        <a href="tel:059634599970" className="underline hover:text-white/80">05963 – 45 999 70</a>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <IoLocationOutline className="text-lg" />
        <span>Haselünner Straße 4-8, 49844 Bawinkel</span>
      </div>
      <div className="mt-6 text-base md:text-lg font-medium opacity-90">
        Wir beraten Sie gern!<br />
        Starten Sie noch heute – mit einer unverbindlichen und kostenlosen Beratung zu Ihrer Immobilie durch unsere Experten.
      </div>
      <div className="mt-2 text-sm opacity-80">
        Oder wir melden uns bei Ihnen:
      </div>
    </aside>
  )
}

export default ContactAside
