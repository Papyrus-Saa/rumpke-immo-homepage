
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputNumberProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
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
  required = false,
  error,
  min,
  max,
  step,
  placeholder = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={name}
        type="number"
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, { required })}
        className={`w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-error' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
};

export default InputNumber;
