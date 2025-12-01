import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputNumberProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  value?: number;
  error?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  name,
  register,
  value,
  error,
  className = "",
  min,
  max,
  step = 1,
  placeholder = "",
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-xs font-medium mb-1">
        {label}
      </label>
      <input
        type="number"
        id={name}
        {...register}
        value={value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        className="px-3 py-2 rounded border text-sm bg-card-secondary-bg-l dark:bg-card-secondary-bg-d text-admin-title-l dark:text-admin-title-d border-admin-border-l dark:border-admin-border-d focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputNumber;
