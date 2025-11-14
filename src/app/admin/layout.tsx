"use client";
import { ThemeSwitch } from '@/context/ThemeSwitsh';
import Link from 'next/link';
import { IoHomeOutline, IoBusinessOutline, IoPeopleOutline, IoMailOutline, IoFolderOutline, IoStarOutline, IoPricetagOutline, IoImageOutline, IoTrendingUpOutline, IoTimerOutline, IoSettingsOutline, IoMenuOutline, IoCloseOutline, IoLogOutOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  };

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

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
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
            <span>Properties</span>
          </Link>

          <Link
            href="/admin/agents"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoPeopleOutline className="text-xl" />
            <span>Agents</span>
          </Link>

          <Link
            href="/admin/leads"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoMailOutline className="text-xl" />
            <span>Leads</span>
          </Link>

          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoFolderOutline className="text-xl" />
            <span>Categories</span>
          </Link>

          <Link
            href="/admin/amenities"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoStarOutline className="text-xl" />
            <span>Amenities</span>
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
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoImageOutline className="text-xl" />
            <span>Media</span>
          </Link>

          <Link
            href="/admin/price-history"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoTrendingUpOutline className="text-xl" />
            <span>Price History</span>
          </Link>

          <Link
            href="/admin/status-history"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoTimerOutline className="text-xl" />
            <span>Status History</span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-Bghover-l dark:hover:bg-Bghover-d rounded-lg transition-colors"
          >
            <IoSettingsOutline className="text-xl" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className='fixed bottom-2 right-1/2 translate-x-1/2'>
          <ThemeSwitch />
        </div>
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
              <Link
                href="/"
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                View Site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-700 transition-colors rounded-lg cursor-pointer"
              >
                <IoLogOutOutline className="text-lg" />
                Logout
              </button>
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
