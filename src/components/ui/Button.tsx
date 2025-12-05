import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-primary dark:bg-primary-dark dark:hover:bg-primary/40 hover:bg-primary/80 disabled:bg-gray-400 text-white",
  secondary:
    "bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 text-white",
  danger:
    "bg-red-600 hover:bg-red-700 text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-2 cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
