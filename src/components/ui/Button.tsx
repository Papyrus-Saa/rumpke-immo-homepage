import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary disabled:bg-gray-400 text-white",
  secondary:
    "bg-secondary dark:bg-secondary-dark hover:dark:text-primary-dark hover:bg-secondary-dark dark:hover:bg-secondary  hover:text-white duration-100",
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
      className={`px-2 py-1 rounded font-medium transition-colors flex items-center gap-2 cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
