'use client';


import PropertiesList from "@/components/properties/PropertiesList";

import { IoAddCircleOutline } from "react-icons/io5";
import React from "react";

const sampleProperties = [
  {
    title: "Modern Apartment",
    mainImage: "https://via.placeholder.com/400x250?text=Main+pic...",
    agentName: "John Doe",
    agentPic: "https://via.placeholder.com/40?text=Agent's+pic...",
  },
];

export default function AdminPropertiesPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuSelect = (value: 'SELL' | 'RENT') => {
    setMenuOpen(false);
    window.location.href = "/admin/properties/new";
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl text-title dark:text-title-dark">Immobilien</h1>
        <div className="flex items-center gap-2 relative">
          <button
            className="bg-transparent text-primary dark:text-primary-dark dark:hover:text-primary hover:text-primary-dark flex items-center justify-center text-xl cursor-pointer border-none outline-none transition-transform duration-200 ease-out hover:scale-105"
            aria-label="Neue Immobilie"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <IoAddCircleOutline className="w-8 h-8" />
          </button>

        </div>
      </div>
      <PropertiesList properties={sampleProperties} />
    </div>
  );
}

/* ---
  Makler - Ansprechpartner * .
  Vorgang - Vermarktungsart * .
  Typ OK *.
  Status OK *.
  Energieklasse OK
  Adresse - Straße, Hausnummer * (intern?).
  Stadt - PLZ *.
  Plz - Ort*.
  Region x.
  Wohnfläche OK *.
  Zimmer OK.
  Schlafzimmer OK
  Badezimmer OK
  Preis OK *
  Land OK
  Nutzfläche Ok
  Grundstücksfläche OK *
  Etage OK
  Gesamtanzahl Etagen OK
  Parkplätze - Stellplätze
  Baujahr OK *
  Renovierungsjahr - Zustand *
  Gemeinschaftskosten x
  Grundsteuer x
  Kaution ok
  Energieverbrauch Ok
  Co2 Emission x
  Bilder ok
  Videoüberwachung x
  Concierge x
  Seo Titel x
  SEo Description x
  Veröffentlicht am - automatisch generieren -------------------
  Archiviert am - automatisch generieren --------------------
  Kategorien komma x
  Ausstattung komma - Checkbox ------------------------
Tags komma - x
Checkboxen: weg: hervorgehoben, Haustiere, Doppelverglasung, Smart Home, Sicherheitstür, Videoüberwachung, Concierge
Küche OK
Heizung - Heizungsart/Typ
Möbliert ok
Ausrichtung x
Provion info - Provivion (selbst eintragen) % Innen- und Außenprovision einzeln * --------------------
Energiezertifikat x
Verfügbar ab OK
Währung *
Preisintervall x
SEo Titel - Objekttitel*
Seo Beschreibung x
Beschreibung OK
Interne Notizen ok (intern?)


  --- */
