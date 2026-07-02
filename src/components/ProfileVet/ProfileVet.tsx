"use client";
import { Pulse } from "@/components/Pulse";
import useMedia from "@/hooks/media";
import AvatarUser from "@/components/ProfileOwner/AvatarUser";
import { useDoctorProfile } from "@/hooks/doctors/useDoctorProfile";

export default function ProfileVet() {
  const isMobile = useMedia();
  const { data } = useDoctorProfile();

  const vetData = [
    { label: "Ім’я", value: data?.name ?? "Не вказано" },
    { label: "Прізвище", value: data?.surname ?? "Не вказано" },
    { label: "По-батькові", value: data?.patronymic ?? "Не вказано" },
    { label: "E-mail", value: data?.userEmail ?? "Не вказано" },
    {
      label: "Досвід, років",
      value: data?.experience != null ? String(data.experience) : "Не вказано",
    },
    {
      label: "Рейтинг",
      value: data?.rating != null ? String(data.rating) : "Не вказано",
    },
    { label: "Організація", value: data?.organization?.name ?? "Не вказано" },
    { label: "Опис", value: data?.description ?? "Не вказано" },
  ];

  if (!data) return <Pulse />;

  return (
    <div className="py-[8px] md:py-0">
      <div className="flex items-center justify-between gap-2 mb-[16px] md:mb-[24px]">
        <h3 className="text-[18px] font-[600] leading-[1] text-gray-900">
          Профіль ветеринара
        </h3>
      </div>

      <div className="flex flex-col items-start gap-[16px] md:flex-row md:gap-[40px]">
        <div className="w-full md:max-w-[104px] flex items-center justify-between gap-[16px]">
          <AvatarUser
            avatar={data?.avatar}
            firstName={data?.name}
            email={data?.userEmail}
            size={isMobile ? 88 : 104}
          />
        </div>

        <ul className="flex flex-wrap justify-start gap-x-[24px] gap-y-[16px] pt-[20px] md:pt-0 border-t border-gray-100 md:border-t-0">
          {vetData.map((item, i) => (
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
