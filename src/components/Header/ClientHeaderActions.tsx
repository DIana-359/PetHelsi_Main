'use client';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Icon from '../Icon';
import { NavLink } from './NavLink';
import { useAuth } from '../../contextAuth/authContext';
import { useSistem } from '../../contextSistem/contextSistem';
import { MobileMenu } from '../MobileMenu';

export function ClientHeaderActions() {
  const { isLoggedIn } = useAuth();

  const {
    isOpenMenu,
    setIsOpenMenu,
    setShowNotification,
    isLoading,
    isMounted,
  } = useSistem();

  const toggleModal = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  if (!isMounted || isLoading) {
    return null;
  }

  return isLoggedIn ? (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShowNotification(true)}
        className="flex items-center justify-center cursor-pointer"
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-bell"
          width="24px"
          height="24px"
          className=" hover:stroke-primary"
        />
      </button>

      <NavLink
        href="/owner/profile"
        className="flex items-center justify-center"
        activeClass="hidden"
      >
        <HiOutlineUserCircle
          width="32px"
          height="32px"
          className="stroke-gray stroke-1 hover:stroke-primary"
        />
      </NavLink>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleModal}
        className="md:hidden"
        aria-label={isOpenMenu ? 'Close menu' : 'Open menu'}
      >
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id={isOpenMenu ? 'icon-close' : 'icon-burger-for-header-mobile'}
          width="32px"
          height="32px"
          className={
            isOpenMenu
              ? 'stroke-gray hover:stroke-primary'
              : 'stroke-gray hover:stroke-primary'
          }
        />
      </button>

      <div className="hidden md:flex flex-row gap-2 lg:gap-5 items-center text-md font-medium">
        <NavLink
          href="/signin"
          className="flex items-center gap-2 border rounded-md border-background pr-1 pl-5 py-2 hover:bg-primary-200 hover:border-primary-800 text-primary"
          onClick={() => setIsOpenMenu(false)}
        >
          Увійти
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-login"
            width="24px"
            height="24px"
            className="stroke-primary stroke-1"
          />
        </NavLink>

        <NavLink
          href="/signup"
          className="flex items-center gap-2 border rounded-md border-primary-800 px-5 py-2 hover:bg-primary-200 text-primary"
          onClick={() => setIsOpenMenu(false)}
        >
          Зареєструватися
        </NavLink>
      </div>
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
    </div>
  );
}
