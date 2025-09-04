'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className = '',
  activeClass = 'text-primary font-bold',
  onClick
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== '/' && pathname.startsWith(href));

  const handleClick = () => {
    onClick?.();
  };
  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClass : 'text-gray'}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
