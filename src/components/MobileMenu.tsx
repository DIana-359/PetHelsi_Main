'use client';

import { NavLink } from '@/components/Header/NavLink';
import { Button } from '@heroui/react';

const NAV_ITEMS_MOBILE = [
  { name: 'Про нас', href: '/about' },
  { name: 'База ветеринарів', href: '/veterinarians' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={`absolute top-21 right-0 w-full h-screen bg-background shadow-lg px-4 py-8 md:hidden transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
    >
      <nav className="flex flex-col justify-between gap-80">
        <ul className="flex flex-col items-start gap-6 text-[16px] font-medium">
          {NAV_ITEMS_MOBILE.map((item, i) => (
            <li key={i}>
              <NavLink
                href={item.href}
                className="hover:text-primary"
                onClick={onClose}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-3 text-lg font-medium">
          <li>
            <NavLink href="/signin" onClick={onClose}>
              <Button
                color="primary"
                variant="light"
                className="w-full text-[16px] font-[400] text-primary-700 bg-background border-[1px] rounded-[8px] border-primary-700"
              >
                Увійти
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink href="/signup" onClick={onClose}>
              <Button
                className="w-full text-[16px] py-3"
                radius="sm"
                color="primary"
              >
                Зареєструватися
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
