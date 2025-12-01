import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";


interface CheckboxBooleanProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  checked: boolean;
  error?: string;
  className?: string;
}


const CheckboxBoolean: React.FC<CheckboxBooleanProps> = ({
  label,
  name,
  register,
  checked,
  error,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register}
        checked={checked}
        className="form-checkbox h-4 w-4 text-primary focus:ring-primary border-admin-border-l dark:border-admin-border-d rounded"
      />
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <span className="ml-2 text-xs font-semibold">
        {checked ? "Ja" : "Nein"}
      </span>
      {error && <span className="text-error text-xs ml-2">{error}</span>}
    </div>
  );
};

export default CheckboxBoolean;
