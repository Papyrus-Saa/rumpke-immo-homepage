
import Link from "next/link";
import { ReactNode } from "react";

interface CategoryButtonProps {
  name: string;
  href: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CategoryButton = ({ name, href, color = "bg-primary", className, style, onClick }: CategoryButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      window.location.href = href;
    }
  };
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 px-4 transition-all border-l-4 rounded duration-200 hover:scale-105 ${color} ${className || ""}`}
      style={style}
      onClick={handleClick}
    >
      {name}
    </Link>
  );
}

export default CategoryButton;
