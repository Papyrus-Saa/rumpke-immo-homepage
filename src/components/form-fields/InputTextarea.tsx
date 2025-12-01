import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputTextareaProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  value?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

const InputTextarea: React.FC<InputTextareaProps> = ({
  label,
  name,
  register,
  value,
  error,
  className = "",
  placeholder = "",
  rows = 4,
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-xs font-medium mb-1">
        {label}
      </label>
      <textarea
        id={name}
        {...register}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="px-3 py-2 rounded border text-sm bg-card-secondary-bg-l dark:bg-card-secondary-bg-d text-admin-title-l dark:text-admin-title-d
         border-admin-border-l dark:border-admin-border-d focus:outline-none focus:ring-2 focus:ring-primary resize-y"
      />
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputTextarea;
