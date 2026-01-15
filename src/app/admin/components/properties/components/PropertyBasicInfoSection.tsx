

import InputNumber from '@/app/admin/components/properties/components/InputNumber';
import InputSelect from '@/app/admin/components/properties/components/InputSelect';
import InputText from '@/app/admin/components/properties/components/InputText';
import { operationOptions, typeOptions, statusOptions, currencyOptions } from '@/app/admin/hooks/properties/components/propertyFormFields';
import { z } from 'zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getAgents } from '@/utils/admin-client';


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

  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 mb-4">
      <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
        Grundinformationen (Pflichtfelder)
      </h2>
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
          <InputSelect
            label="Vermarktungsart *"
            options={operationOptions}
            {...register('operation')}
            error={errors.operation?.message}
            className={getInputClassName('operation')}
          />
        </div>
        <div>
          <InputSelect
            label="Typ *"
            options={typeOptions.map(opt => ({ value: opt.value, label: opt.label.charAt(0).toUpperCase() + opt.label.slice(1) }))}
            {...register('type')}
            error={errors.type?.message}
            className={getInputClassName('type')}
          />
        </div>
        <div>
          <InputSelect
            label="Status *"
            options={statusOptions}
            {...register('status')}
            error={errors.status?.message}
            className={getInputClassName('status')}
          />
        </div>
        <div className="md:col-span-3">
          <InputText
            label="Adresse *"
            placeholder="Straße und Hausnummer"
            {...register('address_line')}
            error={errors.address_line?.message}
            className={getInputClassName('address_line')}
          />
        </div>
        <div>
          <InputText
            label="Stadt *"
            placeholder="Stadt"
            {...register('city')}
            error={errors.city?.message}
            className={getInputClassName('city')}
          />
        </div>
        <div>
          <InputText
            label="Postleitzahl *"
            placeholder="PLZ"
            {...register('postal_code')}
            error={errors.postal_code?.message}
            className={getInputClassName('postal_code')}
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
          <InputSelect
            label="Währung *"
            options={currencyOptions}
            {...register('currency')}
            error={errors.currency?.message}
            defaultChecked="EUR"
            className={getInputClassName('currency')}
          />
        </div>
        <div>
          <InputSelect
            label={<span>Kategorie <span style={{ color: 'currentColor' }}>*</span></span>}
            options={[
              { value: 'haus', label: 'Haus' },
              { value: 'wohnung', label: 'Wohnung' },
              { value: 'gewerbe', label: 'Gewerbe' },
              { value: 'grundstueck', label: 'Grundstück' },
              { value: 'sonstige', label: 'Sonstige' },
            ]}
            {...register('category')}
            error={errors.category?.message}
            className={getInputClassName('category')}
          />
        </div>
      </div>
    </div>
  );
}
