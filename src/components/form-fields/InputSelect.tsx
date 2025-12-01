import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  options: Option[];
  value?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  register,
  options,
  value,
  error,
  className = "",
  placeholder = "Bitte wählen...",
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-xs font-medium mb-1">
        {label}
      </label>
      <select
        id={name}
        {...register}
        value={value}
        disabled={disabled}
        className="px-3 py-2 rounded border text-sm bg-card-secondary-bg-l dark:bg-card-secondary-bg-d text-admin-title-l dark:text-admin-title-d border-admin-border-l dark:border-admin-border-d focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputSelect;
