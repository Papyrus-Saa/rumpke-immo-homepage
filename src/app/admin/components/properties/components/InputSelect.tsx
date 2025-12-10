
import React, { SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: React.ReactNode;
  options: Option[];
  error?: string;
  placeholder?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  options,
  error,
  required,
  placeholder = "",
  multiple = false,
  ...rest
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        multiple={multiple}
        {...rest}
        className={`w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-error' : ''}`}
      >
        {placeholder && !multiple && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default InputSelect;
