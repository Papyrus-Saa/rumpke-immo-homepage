

import InputNumber from '@/app/admin/components/properties/components/InputNumber';
import InputSelect from '@/app/admin/components/properties/components/InputSelect';
import InputText from '@/app/admin/components/properties/components/InputText';
import { operationOptions, typeOptions, statusOptions, currencyOptions } from '@/app/admin/hooks/properties/components/propertyFormFields';
import { z } from 'zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAgents } from '@/utils/admin-client';
import { useUIStore, OperationType, getOperationTypeColor } from '@/store/ui/ui-store';


interface Props {
  register: any;
  errors: Partial<Record<keyof z.infer<typeof propertyFormSchemaZod>, any>>;
  getInputClassName: (field: keyof z.infer<typeof propertyFormSchemaZod>) => string;
  control: any;
}

export default function PropertyBasicInfoSection({ register, errors, getInputClassName, control }: Props) {
  const [agentOptions, setAgentOptions] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    getAgents().then((data) => {
      if (Array.isArray(data)) {
        setAgentOptions(data.map((a: any) => ({ value: a.id, label: a.first_name + ' ' + a.last_name })));
      }
    });
  }, []);

  const operationType = useUIStore(s => s.operationType);
  const operationLabel = operationType === OperationType.SELL ? 'KAUF' : operationType === OperationType.RENT ? 'MIETE' : '';
  const operationColor = getOperationTypeColor(operationType);
  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d flex items-center gap-2">
          Grundinformationen (Pflichtfelder)
        </h2>
        {operationLabel && (
          <span
            className="text-base font-bold uppercase tracking-wider"
            style={{ color: operationColor }}
          >
            {operationLabel}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ...existing code... */}
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputText
                label="Titel *"
                placeholder="z.B. Schöne 3-Zimmer-Wohnung"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.title?.message}
                className={getInputClassName('title')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="agent"
            control={control}
            render={({ field }) => (
              <InputSelect
                name={field.name}
                label="Makler *"
                options={Array.isArray(agentOptions) ? agentOptions : []}
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value)}
                error={errors.agent?.message}
                required
                placeholder="Makler auswählen"
                className={getInputClassName('agent')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="owner"
            control={control}
            render={({ field }) => (
              <InputText
                label="Eigentümer *"
                placeholder="Eigentümer Name"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.owner?.message}
                className={getInputClassName('owner')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <InputSelect
                name={field.name}
                label="Typ *"
                options={typeOptions.map(opt => ({ value: opt.value, label: opt.label.charAt(0).toUpperCase() + opt.label.slice(1) }))}
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value)}
                error={errors.type?.message}
                required
                placeholder="Typ auswählen"
                className={getInputClassName('type')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <InputSelect
                name={field.name}
                label="Status *"
                options={statusOptions}
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value)}
                error={errors.status?.message}
                required
                placeholder="Status auswählen"
                className={getInputClassName('status')}
              />
            )}
          />
        </div>
        <div className="md:col-span-3">
          <Controller
            name="address_line"
            control={control}
            render={({ field }) => (
              <InputText
                label="Straße und Hausnummer *"
                placeholder="z.B. Musterstraße 12"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.address_line?.message}
                className={getInputClassName('address_line')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <InputText
                label="Stadt *"
                placeholder="Stadt"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.city?.message}
                className={getInputClassName('city')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="postal_code"
            control={control}
            render={({ field }) => (
              <InputText
                label="Postleitzahl *"
                placeholder="PLZ"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={errors.postal_code?.message}
                className={getInputClassName('postal_code')}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="built_area_m2"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                label="Wohnfläche (m²) *"
                placeholder="190"
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                error={errors.built_area_m2?.message}
                className={getInputClassName('built_area_m2')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="rooms"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Zimmer *"
                placeholder="3"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                error={errors.rooms?.message}
                className={getInputClassName('rooms')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="bedrooms"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Schlafzimmer *"
                placeholder="2"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                error={errors.bedrooms?.message}
                className={getInputClassName('bedrooms')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="bathrooms"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Badezimmer *"
                placeholder="1"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                error={errors.bathrooms?.message}
                className={getInputClassName('bathrooms')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="price_amount"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Preis *"
                placeholder="450000"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                error={errors.price_amount?.message}
                className={getInputClassName('price_amount')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <InputSelect
                name={field.name}
                label="Währung *"
                options={currencyOptions}
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value)}
                error={errors.currency?.message}
                required
                placeholder="Währung auswählen"
                className={getInputClassName('currency')}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <InputSelect
                name={field.name}
                label={<span>Kategorie <span style={{ color: 'currentColor' }}>*</span></span>}
                options={[{ value: 'haus', label: 'Haus' }, { value: 'wohnung', label: 'Wohnung' }, { value: 'gewerbe', label: 'Gewerbe' }, { value: 'grundstueck', label: 'Grundstück' }, { value: 'sonstige', label: 'Sonstige' }]}
                value={field.value ?? ''}
                onChange={e => field.onChange(e.target.value)}
                error={errors.category?.message}
                required
                placeholder="Kategorie auswählen"
                className={getInputClassName('category')}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
