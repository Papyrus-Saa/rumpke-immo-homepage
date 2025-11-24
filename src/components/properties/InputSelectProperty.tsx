import React from "react";

interface InputSelectPropertyProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  registerProps?: any;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const InputSelectProperty: React.FC<InputSelectPropertyProps> = ({
  label,
  name,
  options,
  registerProps,
  required = false,
  error,
  className = "",
  disabled = false,
}) => (
  <div className={className}>
    <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-300">
      {label}{required && " *"}
    </label>
    <select
      className="w-full px-4 py-2  rounded bg-input-bg dark:bg-input-bg-dark text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      {...registerProps}
      disabled={disabled}
    >
      <option value="">Bitte wählen...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className="text-error text-xs mt-1 block">{error}</span>}
  </div>
);

export default InputSelectProperty;
