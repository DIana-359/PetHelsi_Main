"use client";
import Icon from "@/components/Icon";
import { useSistem } from "@/contextSistem/contextSistem";
import UserLogout from "@/components/ModalContet/UserLogout";

const ButtonLogout = () => {
  const { setIsModalOpen, setModalContent } = useSistem();

  const confirmLogout = () => {
    setModalContent(<UserLogout />);
    setIsModalOpen(true);
  };

  return (
    <button
      onClick={() => {
        confirmLogout();
      }}
      className={"flex items-center gap-[8px] cursor-pointer group mb-[32px]"}>
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id={"icon-logOut-mob-menu"}
        width="24px"
        height="24px"
        className="stroke-gray-900 group-hover:stroke-primary-700 transition-colors"
      />
      <p className="text-[16px] font-[400] leading-[1.4] md:text-[18px] md:font-[500] text-gray-900 group-hover:text-primary-700 transition-colors">
        Вийти
      </p>
    </button>
  );
};

export default ButtonLogout;
