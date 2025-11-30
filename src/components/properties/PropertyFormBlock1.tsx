import InputSelectProperty from '@/components/properties/InputSelectProperty';
import { useAgents } from '@/hooks/agents/useAgents';
import { operationOptions } from '@/components/properties/propertyFields';
import { useForm } from 'react-hook-form';
import { PropertyFormValues } from '@/interfaces/propertyFormValues';
import Link from 'next/link';

export default function PropertyFormBlock1() {
  const { agents } = useAgents();
  const { register, formState: { errors } } = useForm<PropertyFormValues>();

  return (
    <div className="bg-card-bg-l dark:bg-card-bg-d p-4 rounded shadow grid grid-cols-1 gap-4">
      <h3 className="text-xs font-bold text-gray-900 dark:text-white">Hauptdaten</h3>
      <div className="">
      </div>
      <InputSelectProperty
        label="Makler"
        name="agent"
        options={agents.map(agent => ({ value: agent.id, label: `${agent.first_name} ${agent.last_name}` }))}
        required
        registerProps={register('agent', { required: 'Dieses Feld ist erforderlich' })}
        error={errors.agent?.message}
        className="text-xs"
      />
      <InputSelectProperty
        label="Vorgang"
        name="operation"
        options={operationOptions}
        required
        registerProps={register('operation', { required: 'Dieses Feld ist erforderlich' })}
        error={errors.operation?.message}
        className="text-xs"
      />

    </div>
  );
}
