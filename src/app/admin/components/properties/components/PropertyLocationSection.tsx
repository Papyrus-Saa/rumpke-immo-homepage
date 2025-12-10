
import { z } from 'zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import InputText from './InputText';
import InputNumber from './InputNumber';

interface Props {
  register: any;
  errors: Partial<Record<keyof z.infer<typeof propertyFormSchemaZod>, any>>;
  getInputClassName: (field: keyof z.infer<typeof propertyFormSchemaZod>) => string;
}

const PropertyLocationSection = ({ register, errors, getInputClassName }: Props) => {
  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
        Weitere Standortinformationen
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <InputText
            label="Land"
            placeholder="Deutschland"
            {...register('country')}
            error={errors.country?.message}
            className={getInputClassName('country')}
            defaultValue="Deutschland"
          />
        </div>
        <div>
          <InputNumber
            label="Breitengrad"
            placeholder="z.B. 52.520008"
            value={typeof (register('latitude').value) === 'number' && register('latitude').value !== null ? register('latitude').value : ''}
            onChange={e => {
              const value = e.target.value;
              register('latitude').onChange(value === '' ? undefined : Number(value));
            }}
            error={register('latitude').value !== undefined && register('latitude').value !== null && errors.latitude?.message ? errors.latitude?.message : ''}
            className={getInputClassName('latitude')}
            step="any"
          />
        </div>
        <div>
          <InputNumber
            label="Längengrad"
            placeholder="z.B. 13.404954"
            value={typeof (register('longitude').value) === 'number' && register('longitude').value !== null ? register('longitude').value : ''}
            onChange={e => {
              const value = e.target.value;
              register('longitude').onChange(value === '' ? undefined : Number(value));
            }}
            error={register('longitude').value !== undefined && register('longitude').value !== null && errors.longitude?.message ? errors.longitude?.message : ''}
            className={getInputClassName('longitude')}
            step="any"
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyLocationSection;
