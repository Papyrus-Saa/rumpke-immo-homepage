
import Link from "next/link";
import { ReactNode } from "react";

interface CategoryButtonProps {
  name: string;
  href: string;
  color?: string;

  className?: string;
}

const CategoryButton = ({ name, href, color = "bg-primary", className }: CategoryButtonProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 px-4 transition-all border-b-2  duration-200 hover:scale-105 ${color} ${className || ""}`}
    >

      {name}
    </Link>
  );
}

export default CategoryButton;
