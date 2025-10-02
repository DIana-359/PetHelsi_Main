import ChangePassword from "@/components/ChangePassword/ChangePassword";
import { DeleteAccountButton } from "@/components/ProfileOwner/DeleteAccountButton";

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
      <DeleteAccountButton />
    </div>
  );
}
