
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface AgentInputTextProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const AgentInputText: React.FC<AgentInputTextProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  type = "text",
  placeholder = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-1" htmlFor={name}>
        {label} {required && <span className="text-black dark:text-white">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, { required })}
        className={`w-full px-4 py-2 bg-secondary dark:bg-secondary-dark border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-error' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
};

export default AgentInputText;
