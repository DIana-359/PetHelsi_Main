"use client";

import { useUIStore } from "@/stores/useUIStore";
import Icon from "../Icon";
import { MobileMenu } from "../MobileMenu";

export default function BurgerMenue() {
  const isOpenMenu = useUIStore(s => s.isOpenMenu);
  const setIsOpenMenu = useUIStore(s => s.setIsOpenMenu);

  const toggleModal = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  
  return (
    <div className="md:hidden">
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
        <MobileMenu isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
    </div>
  )
}