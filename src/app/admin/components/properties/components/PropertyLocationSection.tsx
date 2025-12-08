
import { InferType } from 'yup';
import { propertyFormSchema } from '@/hooks/property/propertyFormSchema';
import InputTextarea from './InputTextarea';
import InputText from './InputText';
import InputNumber from './InputNumber';

interface Props {
  register: any;
  errors: Partial<Record<keyof InferType<typeof propertyFormSchema>, any>>;
  getInputClassName: (field: keyof InferType<typeof propertyFormSchema>) => string;
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
            {...register('latitude')}
            error={errors.latitude?.message}
            className={getInputClassName('latitude')}
            step="any"
          />
        </div>
        <div>
          <InputNumber
            label="Längengrad"
            placeholder="z.B. 13.404954"
            {...register('longitude')}
            error={errors.longitude?.message}
            className={getInputClassName('longitude')}
            step="any"
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyLocationSection;
