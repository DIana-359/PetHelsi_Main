"use client";
import AvatarUser from "./AvatarUser";
import { Pulse } from "../Pulse";
import useMedia from "@/utils/media";
import EditProfileLink from "./EditProfileLink";
import { useProfile } from "@/hooks/owners/useProfile";

export default function ProfileOwner() {
  const isMobile = useMedia();
  const { data } = useProfile();
  

  const ownerData = [
    // { label: "avatar", value: data?.avatar ?? "" },
    { label: "Ім’я", value: data?.firstName ?? "Не вказано" },
    { label: "Прізвище", value: data?.lastName ?? "Не вказано" },
    { label: "По-батькові", value: data?.middleName ?? "Не вказано" },
    { label: "Телефон", value: data?.phone ?? "Не вказано" },
    { label: "E-mail", value: data?.email ?? "Не вказано" },
    { label: "Дата  народження", value: data?.birthday ?? "Не вказано" },
    { label: "Місце проживання", value: data?.city ?? "Не вказано" },
  ];
  if (!data) return <Pulse />;

  return (
    <div className="py-[8px] md:py-0">
      <div className="flex items-center justify-between gap-2 mb-[16px] md:mb-[24px]">
        <h3 className="text-[18px] font-[600] leading-[1] text-gray-900">
          Особистий профіль
        </h3>
        <div className="hidden md:block">
          <EditProfileLink />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[16px] md:flex-row md:gap-[40px]">
        <div className="w-full md:max-w-[104px] flex items-center justify-between gap-[16px]">
          <AvatarUser
            avatar={data?.avatar}
            firstName={data?.firstName}
            email={data?.email}
            size={isMobile ? 88 : 104}
          />

          <div className="block md:hidden">
            <EditProfileLink />
          </div>
        </div>

        <ul className="flex flex-wrap justify-start gap-x-[24px] gap-y-[16px] pt-[20px] md:pt-0 border-t border-gray-100 md:border-t-0">
          {ownerData.map((item, i) => (
            <li
              key={i}
              className="w-[250px] max-w-[343px] xs:w-[250px] xs:max-w-[250px]">
              <p className="text-[12px] font-[500] leading-[1] text-gray-500 mb-[4px]">
                {item.label}
              </p>
              <p className="text-[14px] font-[400] leading-[1] text-gray-900">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
