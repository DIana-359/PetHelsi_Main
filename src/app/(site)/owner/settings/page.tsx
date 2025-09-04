import Icon from "@/components/Icon";
import ChangePassword from "@/components/ChangePassword/ChangePassword";

export default async function OwnerSettings() {
  return (
    <div>
      <h3 className="text-[18px] md:text-[20px] font-[600] leading-[1] text-gray-900 mb-5">
        Налаштування акаунту
      </h3>

      <div className="border-b-[1px] border-gray-100 mb-[24px]">
        <p className="text-[12px] md:text-[14px] font-[500] leading-[1] text-gray-500 mb-1">
          Ваш E-mail
        </p>
        <p className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-gray-900 mb-5">
          Ivanovskairuna@gmail.com
        </p>
      </div>

      <ChangePassword />

      <button
        type="button"
        className="flex items-center gap-[8px] py-[9px] px-[12px] group cursor-pointer">
        <Icon
          sprite="/sprites/sprite-sistem.svg"
          id="icon-delete"
          width="20px"
          height="20px"
          className="stroke-error-500 fill-none md:w-[24px] md:h-[24px] group-hover:stroke-error-600 transition-stroke duration-300"
        />
        <span className="text-[14px] md:text-[16px] font-[400] leading-[1.4] text-error-500 group-hover:text-error-600 transition-colors duration-300">
          Видалити акаунт
        </span>
      </button>
    </div>
  );
}
