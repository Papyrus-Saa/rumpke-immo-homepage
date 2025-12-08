// moved from src/components/form-fields/CheckboxBoolean.tsx
import React, { InputHTMLAttributes } from "react";

interface CheckboxBooleanProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
const CheckboxBoolean: React.FC<CheckboxBooleanProps> = ({
  label,
  name,
  error,
  required,
  ...rest
}) => {
  return (
    <div className="flex items-center gap-3">
      <input
        id={name}
        name={name}
        type="checkbox"
        required={required}
        {...rest}
        className={`w-5 h-5 text-primary bg-card-bg-l dark:bg-card-bg-d border-admin-border-l dark:border-admin-border-d rounded focus:ring-2 focus:ring-primary ${error ? 'border-error' : ''}`}
      />
      <label htmlFor={name} className="text-sm font-medium text-admin-text-l dark:text-admin-text-d">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default CheckboxBoolean;
