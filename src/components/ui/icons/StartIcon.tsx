import React from "react";

const StartIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="red"
    className={className}
    {...props}
  >
    <path
      d="M1042.36 633.48h-164.73v-114.74l100.83-53.06 63.9 33.64v134.16ZM1048.31 495.75v-39.28l-106.73-56.16-106.75 56.16v182.97h5.95v-179.39l100.8-53.06 100.75 53.06v32.58l-63.87-33.67-106.78 56.21v124.27h176.6v-136.96l30.9 16.26v155h-207.5v5.95h213.48v-164.53l-36.85-19.42Z"
    />
  </svg>
);

export default StartIcon;

