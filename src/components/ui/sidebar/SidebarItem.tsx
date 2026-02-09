import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { ReactNode, cloneElement } from "react";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  color?: string;
  mt?: string;
}

const SidebarItem = ({ href, icon, children, color, mt }: SidebarItemProps) => {

  const closeSidemenu = useUIStore((state) => state.closeSidemenu);
  const iconWithMargin = icon && typeof icon === 'object' && 'type' in icon
    ? cloneElement(icon as any, { className: `${(icon as any).props?.className || ''} mr-2` })
    : icon;
  return (
    <Link
      onClick={closeSidemenu}
      href={href}
      className={`flex items-center mt-4 pl-1 py-1 hover:bg-primary/50 hover:text-black dark:hover:text-white dark:hover:bg-primary-dark/50 rounded transition-all  cursor-pointer w-full`}
    >
      {iconWithMargin}
      {children}
    </Link>
  );
}

export default SidebarItem;
