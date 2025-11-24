import React from "react";

interface InputPropertyProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  registerProps?: any;
  error?: string;
  className?: string;
  defaultValue?: string | number;
}

const InputProperty: React.FC<InputPropertyProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  registerProps,
  error,
  className = "",
  defaultValue,
}) => (
  <div className={className}>
    <label className="block mb-1 font-medium text-xs text-variable-black dark:text-variable-white">
      {label}{required && " *"}
    </label>
    <input
      type={type}
      className="w-full p-2 rounded bg-primary/30 dark:bg-primary-dark/30 text-variable-black dark:text-variable-white text-xs placeholder:text-xs"
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...registerProps}
    />
    {error && <span className="text-error text-xs mt-1 block">{error}</span>}
  </div>
);

export default InputProperty;
