'use client';

import ClientOnly from "@/components/form/ClientOnly";
import LeadForm from "@/components/form/LeadForm";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("@/components/ui/Map/ContactMap"), { ssr: false });



export default function KontaktPage() {
  return (
    <section className="duration-100 mx-auto px-2 py-6 mt-16 flex flex-col gap-8 rounded border-admin-text-d/40 dark:border-admin-text-d/10 border">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="duration-100 w-full md:w-1/2 space-y-6 p-6 md:p-8 rounded bg-card-bg-l dark:bg-card-bg-d shadow-md flex flex-col justify-center">
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
          <div className="w-full h-96 md:h-[480px] rounded overflow-hidden shadow-lg bg-white/70 dark:bg-bg-d/70">
            <ContactMap />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ClientOnly>
          <LeadForm type="CONTACT" propertyId="" source="web" />
        </ClientOnly>
      </div>
    </section>
  );
}
