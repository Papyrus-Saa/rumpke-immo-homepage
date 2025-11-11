
import AboutPortrait from '@/components/ui/About/AboutPortrait';

export default function UeberUnsPage() {
  return (
    <section className="duration-100 max-w-4xl mx-auto px-4 py-6 bg-white/80 dark:bg-black/40 rounded animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:gap-10">
        <div className="shrink-0 flex justify-center md:justify-start md:w-1/3">
          <AboutPortrait />
        </div>
        <div className="w-full space-y-5 mt-4 md:mt-0 flex flex-col items-center md:items-start md:w-2/3">
          <h1 className="text-lg md:text-xl font-bold mb-2 tracking-wide text-center md:text-left text-primary">Über mich</h1>
          <p className="text-sm md:text-base font-normal tracking-wide text-center md:text-left max-w-2xl">
            Mein Name ist Ann-Christin Rumpke, und ich bin eine erfahrene Immobilienmaklerin mit langjähriger Erfahrung in der Immobilienbranche. Angefangen habe ich mit der WEG- und Mietverwaltung im Angestelltenverhältnis und mich nun dazu entschieden mich hauptsächlich auf die Tätigkeit als Immobilienmaklerin und Wertermittlerin zu spezialisieren.
          </p>
          <p className="text-sm md:text-base font-normal tracking-wide text-center md:text-left max-w-2xl">
            Die Prüfung zur Immobilienmaklerin und Wertermittlerin habe ich bei der Industrie- und Handelskammer Niedersachsen erfolgreich abgelegt und bin nun den Schritt in die Selbstständigkeit gegangen. Mein eigenes Büro habe ich im Sommer eröffnet und freue mich nun darauf, meine Expertise als Immobilienmaklerin im Emsland und der Grafschaft Bentheim anzubieten.
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „Mein Ansatz ist authentisch, kompetent und echt. Ich sehe mich nicht nur als Maklerin, sondern als Dienstleister, der Ihnen bei allen Fragen rund um die Immobilie zur Seite steht.
            Egal, ob Sie eine Immobilie kaufen, verkaufen oder bewerten möchten, ich bin für Sie da.“
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „In allen Unternehmensbereichen arbeite ich mit einem Netzwerk von spezialisierten Experten zusammen, um sicherzustellen, dass Sie die bestmögliche Unterstützung erhalten.“
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „Für mich gibt es kein „geht nicht“ – wir finden einen Weg und auch die Lösung für Ihre individuellen Bedürfnisse.
            Lassen Sie uns gemeinsam die richtige Immobilie für Sie finden oder den bestmöglichen Preis für Ihre Immobilie erzielen.“
          </p>
        </div>
      </div>
    </section>
  );
}
