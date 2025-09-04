import { useSistem } from "@/contextSistem/contextSistem";
import { Button } from "@heroui/react";
import Icon from "@/components/Icon";

export default function ChangePasswordSucsess() {
  const { setIsModalOpen } = useSistem();

  return (
    <div className="flex flex-col items-center">
      <Icon
        sprite="/sprites/sprite-sistem.svg"
        id="icon-check"
        width="46px"
        height="46px"
        className="md:w-[96px] md:h-[96px] fill-primary-700 stroke-primary-700 mb-2"
      />
      <p className="text-[20px] md:text-[22px] font-[500] leading-[1] text-gray-900 text-center mb-6">
        Ваш пароль успішно змінено
      </p>
      <Button
        type="button"
        onPress={(): void => setIsModalOpen(false)}
        className="max-w-[304px] py-[16px] px-[32px] md:px-[114px] text-[16px] md:text-[18px] font-[400] leading-[1] text-background bg-primary-700 rounded-[8px]">
        Зрозуміло
      </Button>
    </div>
  );
}
