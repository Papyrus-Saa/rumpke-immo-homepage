import React from "react";

interface InputCheckboxPropertyProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  className?: string;
}

const InputCheckboxProperty: React.FC<InputCheckboxPropertyProps> = ({
  label,
  name,
  register,
  error,
  className = "",
}) => (
  <div className={className + " flex items-center gap-2"}>
    <input
      type="checkbox"
      className="mr-2"
      {...register(name)}
    />
    <label className="text-xs text-variable-black dark:text-variable-white">
      {label}
    </label>
    {error && <span className="text-variable-error text-xs">{error}</span>}
  </div>
);

export default InputCheckboxProperty;
