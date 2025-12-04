import React from "react";

interface ErrorToastProps {
  message: string;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message }) => (
  <div
    className="w-full px-4 py-2 rounded text-white fade-in mt-2 bg-error text-center"
    role="alert"
  >
    {message}
  </div>
);

export default ErrorToast;
