'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAgent } from '@/utils/admin-client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { IoArrowBackOutline, IoSaveOutline, IoSchoolOutline } from 'react-icons/io5';
import Select from 'react-select';
import { languages, languageOptions } from '@/hooks/multilingualField/useMultilingualFields';

export default function NewAgentPage() {

  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    window.location.replace('/admin/login');
    return null;
  }
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
    languages: [] as string[],
    photo_url: '',
    position_de: '',
    position_en: '',
    position_es: '',
    position_pt: '',
    position_fr: '',
    position_it: '',
    position_nl: '',
    position_pl: '',
    position_ru: '',
    position_ar: '',
    position_zh: '',
    position_ja: '',
    position_tr: '',
    position_hi: '',
    bio_de: '',
    bio_en: '',
    bio_es: '',
    bio_pt: '',
    bio_fr: '',
    bio_it: '',
    bio_nl: '',
    bio_pl: '',
    bio_ru: '',
    bio_ar: '',
    bio_zh: '',
    bio_ja: '',
    bio_tr: '',
    bio_hi: '',
    is_active: true,
    is_public: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.languages);
    setLoading(true);
    setError('');

    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Bitte füllen Sie Vorname, Nachname, E-Mail und Telefonnummer aus.');
      return;
    }
    if (!formData.languages || formData.languages.length === 0) {
      setError('Bitte wählen Sie mindestens eine Sprache aus.');
      return;
    }


    try {
      await createAgent(formData);
      router.push('/admin/agents');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/agents"
          className="inline-flex items-center gap-2 hover:text-primary mb-4 text-xs text-primary hover:underline"
        >
          <IoArrowBackOutline />
          <span>Zurück zu Maklern</span>
        </Link>
        <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Neuen Makler erstellen</h1>
        <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
          Fügen Sie einen neuen Immobilienmakler zu Ihrem Team hinzu
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 dark:bg-error/20 border border-error dark:border-error rounded-lg">
          <p className="text-sm text-error dark:text-error">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4">
            Basisinformationen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2">
                Vorname *
              </label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2">
                Nachname *
              </label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Telefon *
              </label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Handy
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Foto-URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="flex-1 px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  type="button"
                  variant="primary"
                  className="whitespace-nowrap cursor-po
              inter"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        // TODO: Implementar upload a servidor
                        console.log('Datei ausgewählt:', file);

                        const url = URL.createObjectURL(file);
                        setFormData({ ...formData, photo_url: url });
                      }
                    };
                    input.click();
                  }}
                >
                  Hochladen
                </Button>
              </div>
            </div>
          </div>

          {/* Sprachen */}
          <div className="mt-4 text-black">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sprachen *
            </label>
            <Select
              isMulti
              instanceId="agent-languages"
              options={languageOptions}
              value={languageOptions.filter(opt => formData.languages.includes(opt.value))}
              onChange={(selected) => {
                setFormData({
                  ...formData,
                  languages: selected ? selected.map(s => s.value) : []
                });
              }}
              placeholder="Sprachen auswählen..."
              className="react-select-container"
              classNamePrefix="react-select"
              formatOptionLabel={(option) => {
                const [flag, ...rest] = option.label.split(' ');
                return (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.2em' }}>{flag}</span>
                    <span>{rest.join(' ')}</span>
                  </span>
                );
              }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Wählen Sie alle Sprachen aus, die der Makler spricht
            </p>
          </div>
        </div>


        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IoSchoolOutline className="text-xl" />
            Berufsbezeichnung (Mehrsprachig)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <div key={`position-${lang.code}`}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang.flag} {lang.name}
                </label>
                <input
                  type="text"
                  value={(formData[`position_${lang.code}` as keyof typeof formData] as string) || ''}
                  onChange={(e) => setFormData({ ...formData, [`position_${lang.code}`]: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bio Information */}
        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Biografie (Mehrsprachig)
          </h2>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={`bio-${lang.code}`}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {lang.flag} {lang.name}
                </label>
                <textarea
                  rows={3}
                  value={(formData[`bio_${lang.code}` as keyof typeof formData] as string) || ''}
                  onChange={(e) => setFormData({ ...formData, [`bio_${lang.code}`]: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Einstellungen
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 text-primary bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 rounded focus:ring-2 focus:ring-primary"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Aktiv</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Makler kann Anfragen erhalten und kontaktiert werden</p>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.is_public}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                className="w-5 h-5 text-primary bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 rounded focus:ring-2 focus:ring-primary"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Öffentlich</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Makler auf der öffentlichen Webseite anzeigen</p>
              </div>
            </label>
          </div>
        </div>

        {/* Previsualización del JSON a enviar */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview datos enviados</label>
          <pre className="bg-gray-100 dark:bg-neutral-800 p-4 rounded text-xs overflow-x-auto max-h-64">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div> */}

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} variant="primary">
            <IoSaveOutline className="text-xl" />
            <span>{loading ? 'Wird erstellt...' : 'Makler erstellen'}</span>
          </Button>
          <Link href="/admin/agents">
            <Button type="button" variant="secondary">
              Abbrechen
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
