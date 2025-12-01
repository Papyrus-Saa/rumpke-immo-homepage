import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputDateProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  value?: string;
  error?: string;
  className?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  name,
  register,
  value,
  error,
  className = "",
  min,
  max,
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-xs font-medium mb-1">
        {label}
      </label>
      <input
        type="date"
        id={name}
        {...register}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        className="px-3 py-2 rounded border text-sm bg-card-secondary-bg-l dark:bg-card-secondary-bg-d text-admin-title-l dark:text-admin-title-d border-admin-border-l dark:border-admin-border-d focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputDate;
