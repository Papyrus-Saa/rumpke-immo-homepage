"use client";
import { ThemeSwitch } from '@/context/ThemeSwitsh';
import Link from 'next/link';

import { useLeadStatusCounts } from './hooks/leads/useLeadStatusCounts';
import { IoHomeOutline, IoBusinessOutline, IoPeopleOutline, IoMailOutline, IoFolderOutline, IoStarOutline, IoPricetagOutline, IoImageOutline, IoTrendingUpOutline, IoTimerOutline, IoSettingsOutline, IoMenuOutline, IoCloseOutline, IoLogOutOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LeadBadge from './components/leads/LeadBadge';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      setIsLoggedIn(!!token);
      if (!token && pathname !== '/admin/login') {
        router.replace('/admin/login');
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    router.replace('/admin/login');
  };

  const { newCount, inProgressCount } = useLeadStatusCounts();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-bg-l dark:bg-bg-d">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card-bg-l dark:bg-card-bg-d border-r border-gray-200 dark:border-neutral-700 overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Rumpke Admin
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Immobilien Management
          </p>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoHomeOutline className="text-xl" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/properties"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoBusinessOutline className="text-xl" />
            <span>Immobilien</span>
          </Link>

          <Link
            href="/admin/agents"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoPeopleOutline className="text-xl" />
            <span>Makler</span>
          </Link>

          <Link
            href="/admin/leads"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoMailOutline className="text-xl" />
            <span>Anfragen</span>
            <LeadBadge newCount={newCount} />
          </Link>

          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoFolderOutline className="text-xl" />
            <span>Kategorien</span>
          </Link>

          <Link
            href="/admin/amenities"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoStarOutline className="text-xl" />
            <span>Ausstattung</span>
          </Link>

          <Link
            href="/admin/tags"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoPricetagOutline className="text-xl" />
            <span>Tags</span>
          </Link>

          <Link
            href="/admin/media"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors hover:text-white"
          >
            <IoImageOutline className="text-xl" />
            <span>Medien</span>
          </Link>

          <Link
            href="/admin/price-history"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoTrendingUpOutline className="text-xl" />
            <span>Preisverlauf</span>
          </Link>

          <Link
            href="/admin/status-history"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoTimerOutline className="text-xl" />
            <span>Statusverlauf</span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoSettingsOutline className="text-xl" />
            <span>Einstellungen</span>
          </Link>
        </nav>
      </aside>
      <main className="ml-64 min-h-screen">
        <header className="sticky top-0 z-10 bg-card-bg-l dark:bg-card-bg-d border-b border-gray-200 dark:border-neutral-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-gray-700 dark:text-gray-300">
                <IoMenuOutline className="text-2xl" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Panel
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className='text-xs hover:text-blue-400'>
                <ThemeSwitch />
              </div>
              <Link
                href="/"
                className="px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
              >
                <IoHomeOutline className="text-base" />
                Webseite ansehen
              </Link>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-700 transition-colors rounded-lg cursor-pointer text-xs"
                >
                  <IoLogOutOutline className="text-lg" />
                  Abmelden
                </button>
              ) : (
                <Link
                  href="/admin/login"
                  className="flex items-center gap-2 px-4 py-2 text-green-600 dark:text-green-400 hover:text-white hover:bg-green-600 dark:hover:bg-green-700 transition-colors rounded-lg cursor-pointer text-xs"
                >
                  Anmelden
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
