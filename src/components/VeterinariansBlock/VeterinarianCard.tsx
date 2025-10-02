import { Card, CardBody, Avatar } from "@heroui/react";
import vet from "../../../public/Images/VeterinarianCard-img-eg.jpg";
import Icon from "../Icon";
import { Vet } from "@/utils/types/vet";
import Link from "next/link";
import { getYearWord } from "@/utils/types/formatExperience";
import VeterinariansButtons from "./VeterinariansButtons";
import VeterinarianPrice from "./VeterinarianPrice";

type Props = {
  veterinarian: Vet;
  hasAvatar?: boolean;
  size?: "small" | "large" | "base";
  token?: true;
};

export default function VeterinarianCard({
  veterinarian,
  hasAvatar = true,
  size = "base",
  token,
}: Props) {
  const paddingsBody = {
    small: "p-4",
    large: "p-6",
    base: "p-6",
  };

  const titleStyles = {
    small: "text-lg font-semibold leading-[140%] text-gray-900 mb-[6px]",
    large: "text-2xl font-medium leading-[150%] text-gray-900 mb-2",
    base: "text-xl font-medium leading-[140%] text-gray-900 mb-2",
  };

  const experienceStyles = {
    small: "text-sm font-normal leading-[140%] mb-[12px]",
    large: "text-base font-normal leading-[140%] mb-2",
    base: "text-base font-normal leading-[100%] mb-2",
  };

  const iconStyles = {
    small: "w-[16px] h-[16px]",
    large: "w-[20px] h-[20px]",
    base: "w-[20px] h-[20px]",
  };

  const reviewsStyles = {
    small: "text-sm font-normal leading-[140%] mb-2",
    large: "text-base font-normal leading-[140%] mb-3",
    base: "text-base font-normal leading-[100%] mb-3",
  };

  return (
    <Card className="border border-gray-100 bg-white shadow-none rounded-xl">
      <CardBody className={`${paddingsBody[size]}`}>
        {hasAvatar && (
          <Link href={`/veterinarians/${veterinarian.id}`}>
            <Avatar
              className="w-26 h-26 lg:w-32 lg:h-32 mb-2"
              radius="full"
              src={vet.src}
            />
          </Link>
        )}
        <Link href={`/veterinarians/${veterinarian.id}`}>
          <h4 className={`${titleStyles[size]}`}>
            {veterinarian.surname} <br /> {veterinarian.name}{" "}
            {veterinarian.patronymic}
          </h4>
        </Link>
        <p className={`${experienceStyles[size]}`}>
          <span className="text-gray-600">Стаж: </span>
          <span className="text-gray-800">
            {veterinarian.experience} {getYearWord(veterinarian.experience)}
          </span>
        </p>

        <div className={`flex gap-1 items-center ${reviewsStyles[size]}`}>
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-star_fill"
            width="20px"
            height="20px"
            className={`fill-primary-700 ${iconStyles[size]}`}
          />
          <span className="text-gray-900">{veterinarian.rating}</span>
          <span className="text-gray-600">(0 відгуки)</span>
        </div>
        <div>
          <VeterinarianPrice price={veterinarian.rate} />
        </div>
        <VeterinariansButtons id={veterinarian.id} size={size} token={token} />
      </CardBody>
    </Card>
  );
}
