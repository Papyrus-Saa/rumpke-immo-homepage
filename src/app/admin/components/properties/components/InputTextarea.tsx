
import React, { TextareaHTMLAttributes } from "react";

interface InputTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const InputTextarea: React.FC<InputTextareaProps> = ({
  label,
  name,
  error,
  required,
  rows = 3,
  placeholder = "",
  ...rest
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2" htmlFor={name}>
        {label} {required && <span className="text-error">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        {...rest}
        className={`w-full px-4 py-2 bg-secondary dark:bg-secondary-dark border border-admin-border-l dark:border-admin-border-d rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent ${error ? 'border-error' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default InputTextarea;
