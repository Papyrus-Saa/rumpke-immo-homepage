'use client';
import { useDashboardSummary } from '@/hooks/useDashboardSummary';

const kpiList = [
  { key: 'totalProperties', label: 'Gesamtobjekte' },
  { key: 'publishedProperties', label: 'Veröffentlicht' },
  { key: 'reservedProperties', label: 'Reserviert' },
  { key: 'soldProperties', label: 'Verkauft' },
  { key: 'rentedProperties', label: 'Vermietet' },
  { key: 'draftProperties', label: 'Entwurf' },
  { key: 'hiddenProperties', label: 'Versteckt' },
  { key: 'totalAgents', label: 'Gesamtmakler' },
  { key: 'activeAgents', label: 'Aktive Makler' },
  { key: 'inactiveAgents', label: 'Inaktive Makler' },
  { key: 'totalLeads', label: 'Gesamtanfragen' },
  { key: 'leadsThisMonth', label: 'Anfragen diesen Monat' },
  { key: 'totalCategories', label: 'Kategorien' },
  { key: 'totalTags', label: 'Tags' },
  { key: 'totalAmenities', label: 'Ausstattung' },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardSummary();

  return (
    <div className="px-8 py-4 dark:bg-card-secondary-bg-d bg-card-secondary-bg-l">
      <h1 className="text-3xl font-semibold mb-2">Admin Dashboard</h1>
      {isLoading && (
        <div className="text-center text-gray-500">Loading dashboard...</div>
      )}
      {error && (
        <div className="text-center text-red-500">Error loading dashboard.</div>
      )}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-7">
          {kpiList.map((kpi) => (
            <div
              key={kpi.key}
              className="bg-card-bg-l dark:bg-card-bg-d shadow rounded p-6 flex flex-col items-center"
            >
              <span className="text-lg font-semibold text-gray-dark dark:text-gray-light mb-2">
                {kpi.label}
              </span>
              <span className="text-xl bg-card-secondary-bg-l dark:bg-card-secondary-bg-d px-6 rounded">
                {data[kpi.key as keyof typeof data]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
