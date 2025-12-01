import React from "react";

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className || "w-4 h-4"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-1.06 1.06-3.182-3.182 1.06-1.06zM4.5 17.25V19.5h2.25l9.197-9.197-3.182-3.182L4.5 17.25z"
    />
  </svg>
);

export default PencilIcon;
