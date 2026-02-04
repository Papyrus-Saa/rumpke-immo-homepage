'use client';
import { useDashboardSummary } from '@/app/admin/hooks/dashboard/components/useDashboardSummary';
import { IoHomeOutline, IoCheckmarkCircle, IoTimeOutline, IoKeyOutline, IoDocumentTextOutline, IoEyeOffOutline, IoPeopleOutline, IoPersonOutline, IoMailOutline, IoPricetagOutline, IoGridOutline, IoCalendarOutline } from 'react-icons/io5';

const kpiSections = [
  {
    title: 'Immobilien',
    items: [
      { key: 'totalProperties', label: 'Gesamtobjekte', icon: IoHomeOutline, color: 'text-primary' },
      { key: 'publishedProperties', label: 'Veröffentlicht', icon: IoCheckmarkCircle, color: 'text-success' },
      { key: 'reservedProperties', label: 'Reserviert', icon: IoTimeOutline, color: 'text-warning' },
      { key: 'soldProperties', label: 'Verkauft', icon: IoKeyOutline, color: 'text-error' },
      { key: 'rentedProperties', label: 'Vermietet', icon: IoKeyOutline, color: 'text-rent' },
      { key: 'draftProperties', label: 'Entwurf', icon: IoDocumentTextOutline, color: 'text-admin-text-l dark:text-admin-text-d' },
      { key: 'hiddenProperties', label: 'Versteckt', icon: IoEyeOffOutline, color: 'text-admin-text-l dark:text-admin-text-d' },
    ]
  },
  {
    title: 'Team',
    items: [
      { key: 'totalAgents', label: 'Gesamtmakler', icon: IoPeopleOutline, color: 'text-primary' },
      { key: 'activeAgents', label: 'Aktive Makler', icon: IoPersonOutline, color: 'text-success' },
      { key: 'inactiveAgents', label: 'Inaktive Makler', icon: IoPersonOutline, color: 'text-admin-text-l dark:text-admin-text-d' },
    ]
  },
  {
    title: 'Anfragen',
    items: [
      { key: 'totalLeads', label: 'Gesamtanfragen', icon: IoMailOutline, color: 'text-primary' },
      { key: 'leadsThisMonth', label: 'Diesen Monat', icon: IoCalendarOutline, color: 'text-success' },
    ]
  },
  {
    title: 'Verwaltung',
    items: [
      { key: 'totalCategories', label: 'Kategorien', icon: IoGridOutline, color: 'text-primary' },
      { key: 'totalTags', label: 'Tags', icon: IoPricetagOutline, color: 'text-primary' },
      { key: 'totalAmenities', label: 'Ausstattung', icon: IoGridOutline, color: 'text-primary' },
    ]
  }
];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardSummary();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-admin-text-l dark:text-admin-text-d mb-2">
          Dashboard
        </h1>
        <p className="text-admin-text-l dark:text-admin-text-d">
          Überblick über Ihre Immobilienverwaltung
        </p>
      </div>

      {isLoading && (
        <div className="text-center text-admin-text-l dark:text-admin-text-d py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4">Lade Dashboard...</p>
        </div>
      )}

      {error && (
        <div className="bg-error/10 border border-error rounded-lg p-6 text-center text-error">
          Fehler beim Laden des Dashboards
        </div>
      )}


      {data && (
        <div className="space-y-8">
          {kpiSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded"></span>
                {section.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.items.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.key}
                      className="bg-secondary dark:bg-secondary-dark rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-card-secondary-bg-l dark:bg-card-secondary-bg-d ${kpi.color}`}>
                          <Icon className="text-2xl" />
                        </div>
                        <span className="text-3xl font-bold text-admin-text-l dark:text-admin-text-d">
                          {data[kpi.key as keyof typeof data]}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-admin-text-l dark:text-admin-text-d">
                        {kpi.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
