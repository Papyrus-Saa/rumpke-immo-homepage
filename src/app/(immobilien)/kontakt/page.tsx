'use client';

import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("@/components/ui/Map/ContactMap"), { ssr: false });



export default function KontaktPage() {
  return (
    <section className="duration-100 max-w-4xl mx-auto px-2 py-6 mt-16 flex flex-col gap-8 md:flex-row md:gap-8 bg-bg-l dark:bg-bg-d rounded">
      {/* Datos de contacto */}
      <div className="duration-100 w-full md:w-1/2 space-y-6 p-6 md:p-8 rounded bg-white/80 dark:bg-black/40 border border-primary/20 shadow-md flex flex-col justify-center">
        <h1 className="text-xl font-bold text-primary mb-2 tracking-wide drop-shadow">Kontakt</h1>
        <p className="text-base font-medium tracking-wide text-primary-dark dark:text-primary/80">Sie möchten Ihre Immobilie verkaufen, bewerten lassen oder vermieten?</p>
        <div className="mt-6 space-y-2">
          <div className="font-semibold text-sm tracking-wider">Rumpke Immobilien</div>
          <div className="text-sm tracking-wider">Ann-Christin Rumpke</div>
        </div>
        <div className="mt-6 space-y-2">
          <a href="mailto:info@rumpke-immobilien.de" className="text-primary underline text-sm tracking-wider">info@rumpke-immobilien.de</a>
          <div className="text-sm tracking-wider">0172 – 32 444 68</div>
          <div className="text-sm tracking-wider">05963 – 45 999 70</div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="text-sm tracking-wider">Haselünner Straße 4-8</div>
          <div className="text-sm tracking-wider">49844 Bawinkel</div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center">
        <div className="w-full h-96 md:h-[480px] rounded overflow-hidden shadow-lg border border-primary/20 bg-white/70 dark:bg-bg-d/70">
          <ContactMap />
        </div>
      </div>
    </section>
  );
}
