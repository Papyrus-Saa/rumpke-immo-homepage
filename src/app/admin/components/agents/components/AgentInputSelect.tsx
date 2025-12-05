
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface AgentInputSelectProps {
  label: string;
  name: string;
  options: Option[];
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const AgentInputSelect: React.FC<AgentInputSelectProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  error,
  placeholder = "",
  disabled = false,
  multiple = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        disabled={disabled}
        multiple={multiple}
        className={`w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-error' : ''}`}
      >
        {placeholder && !multiple && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
};

export default AgentInputSelect;
