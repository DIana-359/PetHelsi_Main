import Link from "next/link";
import { IProfileOwner } from "../../app/types/ownerTypes";
import Icon from "../Icon";
import AvatarUser from "./AvatarUser";

interface Props {
  userData: IProfileOwner;
}

export default function ProfileOwner({ userData }: Props) {
  const { avatar, email } = userData;

  const ownerData = [
    // { label: "avatar", value: data?.avatar ?? "" },
    { label: "Ім’я", value: userData?.firstName ?? "Не вказано" },
    { label: "Прізвище", value: userData?.lastName ?? "Не вказано" },
    { label: "По-батькові", value: userData?.middleName ?? "Не вказано" },
    { label: "Телефон", value: userData?.phone ?? "Не вказано" },
    { label: "E-mail", value: userData?.email ?? "Не вказано" },
    { label: "Дата  народження", value: userData?.birthday ?? "Не вказано" },
    { label: "Місце проживання", value: userData?.city ?? "Не вказано" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-[24px]">
        <h3 className="text-[18px] font-[600] leading-[1] text-gray-900">
          Особистий профіль
        </h3>

        <div className="flex items-center gap-[8px] group">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-pen"
            width="20px"
            height="20px"
            className="stroke-gray-700 fill-background group-hover:stroke-primary-900"
          />
          <Link href={"/owner/profile/edit-profile"}>
            <span className="text-[14px] font-[400] leading-[1] text-primary-700 group-hover:text-primary-900">
              Редагувати
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center min:items-start">
        <div className="flex flex-col min:flex-row min:justify-start gap-[40px] ">
          <AvatarUser avatar={avatar} email={email} size={128} />
          <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[16px] w-full">
            {ownerData.map((item, i) => (
              <li key={i} className="w-full">
                <p className="text-[12px] font-[500] leading-[1] text-gray-500 mb-1">
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
    </div>
  );
}
