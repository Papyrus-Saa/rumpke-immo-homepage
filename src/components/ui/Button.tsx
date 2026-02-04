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
    "bg-secondary dark:bg-secondary-dark hover:bg-secondary/70 dark:hover:bg-secondary/50 text-white",
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
