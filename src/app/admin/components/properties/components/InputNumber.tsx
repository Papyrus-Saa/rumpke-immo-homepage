
import React, { InputHTMLAttributes } from "react";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  name,
  error,
  required,
  ...rest
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        required={required}
        min={0}
        step={rest.step}
        value={rest.value ?? ''}
        onChange={rest.onChange}
        className={`w-full px-4 py-2 bg-card-bg-l dark:bg-card-bg-d border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent ${error ? 'border-error' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};


export default InputNumber;
