import { z } from 'zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import InputText from './InputText';
import InputNumber from './InputNumber';
import { Controller } from "react-hook-form";

interface Props {
  register: any;
  errors: Partial<Record<keyof z.infer<typeof propertyFormSchemaZod>, any>>;
  getInputClassName: (field: keyof z.infer<typeof propertyFormSchemaZod>) => string;
  control: any;
}

const PropertyLocationSection = ({ register, errors, getInputClassName, control }: Props) => {
  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 mb-4">
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
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Breitengrad"
                placeholder="z.B. 52.520008"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? null : Number(value));
                }}
                error={errors.latitude?.message}
                className={getInputClassName('latitude')}
                step="any"
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <InputNumber
                name={field.name}
                label="Längengrad"
                placeholder="z.B. 13.404954"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? null : Number(value));
                }}
                error={errors.longitude?.message}
                className={getInputClassName('longitude')}
                step="any"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyLocationSection;
