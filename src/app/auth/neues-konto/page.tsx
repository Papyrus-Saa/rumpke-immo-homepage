
import Link from 'next/link';

export default function () {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className="text-4xl mb-5">Neues Konto erstellen</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Name und Nachname</label>
        <input
          className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary mb-5"
          type="text" />

        <label htmlFor="email">E-Mail-Adresse</label>
        <input
          className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary mb-5"
          type="email" />


        <label htmlFor="password">Passwort</label>
        <input
          className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#171717] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary mb-5"
          type="password" />

        <button
          className="bg-primary dark:bg-primary-dark text-white font-semibold px-5 py-2 rounded-md hover:bg-hover-l dark:hover:bg-hover-d transition-all duration-200 mb-5 cursor-pointer hover:bg-primary-dark dark:hover:bg-primary">
          Konto erstellen
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2">Oder</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/anmelden"
          className="btn-secondary text-center">
          Anmelden
        </Link>

      </div>
    </main>
  );
}
