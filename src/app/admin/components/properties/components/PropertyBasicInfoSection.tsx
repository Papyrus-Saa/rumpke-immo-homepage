
import InputNumber from '@/app/admin/components/properties/components/InputNumber';
import InputSelect from '@/app/admin/components/properties/components/InputSelect';
import InputText from '@/app/admin/components/properties/components/InputText';
import { operationOptions, typeOptions, statusOptions, currencyOptions } from '@/hooks/property/propertyFormFields';
import { InferType } from 'yup';
import { propertyFormSchema } from '@/hooks/property/propertyFormSchema';

interface Props {
  register: any;
  errors: Partial<Record<keyof InferType<typeof propertyFormSchema>, any>>;
  getInputClassName: (field: keyof InferType<typeof propertyFormSchema>) => string;
}

export default function PropertyBasicInfoSection({ register, errors, getInputClassName }: Props) {
  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
        {/* Icono puede ser pasado por prop si se desea */}
        Grundinformationen (Pflichtfelder)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <InputText
            label="Titel *"
            placeholder="z.B. Schöne 3-Zimmer-Wohnung"
            {...register('title')}
            error={errors.title?.message}
            className={getInputClassName('title')}
          />
        </div>
        <div>
          <InputText
            label="Makler *"
            placeholder="Makler Name"
            {...register('agent')}
            error={errors.agent?.message}
            className={getInputClassName('agent')}
          />
        </div>
        <div>
          <InputText
            label="Eigentümer *"
            placeholder="Eigentümer Name"
            {...register('owner')}
            error={errors.owner?.message}
            className={getInputClassName('owner')}
          />
        </div>
        <div>
          <InputSelect
            label="Operation *"
            options={operationOptions}
            {...register('operation')}
            error={errors.operation?.message}
            className={getInputClassName('operation')}
          />
        </div>
        <div>
          <InputSelect
            label="Typ *"
            options={typeOptions}
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
          <InputNumber
            label="Wohnfläche (m²) *"
            placeholder="120"
            {...register('built_area_m2')}
            error={errors.built_area_m2?.message}
            className={getInputClassName('built_area_m2')}
          />
        </div>
        <div>
          <InputNumber
            label="Zimmer *"
            placeholder="3"
            {...register('rooms')}
            error={errors.rooms?.message}
            className={getInputClassName('rooms')}
          />
        </div>
        <div>
          <InputNumber
            label="Schlafzimmer *"
            placeholder="2"
            {...register('bedrooms')}
            error={errors.bedrooms?.message}
            className={getInputClassName('bedrooms')}
          />
        </div>
        <div>
          <InputNumber
            label="Badezimmer *"
            placeholder="1"
            {...register('bathrooms')}
            error={errors.bathrooms?.message}
            className={getInputClassName('bathrooms')}
          />
        </div>
        <div>
          <InputNumber
            label="Preis *"
            placeholder="450000"
            {...register('price_amount')}
            error={errors.price_amount?.message}
            className={getInputClassName('price_amount')}
          />
        </div>
        <div>
          <InputSelect
            label="Währung *"
            options={currencyOptions}
            {...register('currency')}
            error={errors.currency?.message}
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
        <div className="md:col-span-3">
          <InputText
            label="Hauptbild URL *"
            placeholder="https://example.com/image.jpg"
            {...register('main_image')}
            error={errors.main_image?.message}
            className={getInputClassName('main_image')}
            type="url"
          />
        </div>
      </div>
    </div>
  );
}
