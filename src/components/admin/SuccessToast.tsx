import React from "react";

interface SuccessToastProps {
  message: string;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message }) => (
  <div
    className="w-full px-4 py-2 rounded text-white fade-in mt-2 bg-primary-dark/30 text-center"
  >
    {message}
  </div>
);

export default SuccessToast;
