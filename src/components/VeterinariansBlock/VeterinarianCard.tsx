import { Card, CardBody, Avatar, Button } from "@heroui/react";
import vet from "../../../public/Images/VeterinarianCard-img-eg.jpg";
import Icon from "../Icon";
import { Vet } from "@/utils/types/vet";
import Link from "next/link";
import { getYearWord } from "@/utils/types/formatExperience";

type Props = {
  veterinarian: Vet;
  hasAvatar?: boolean;
  size?: "small" | "large" | "base";
};

export default function VeterinarianCard({
  veterinarian,
  hasAvatar = true,
  size = "base",
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
    large: "text-base font-normal leading-[140%] mb-4",
    base: "text-base font-normal leading-[100%] mb-2",
  };

  const iconStyles = {
    small: "w-[16px] h-[16px]",
    large: "w-[20px] h-[20px]",
    base: "w-[20px] h-[20px]",
  };

  const reviewsStyles = {
    small: "text-sm font-normal leading-[140%]",
    large: "text-base font-normal leading-[140%]",
    base: "text-base font-normal leading-[100%]",
  };

  const buttonTodayStyles = {
    small: "h-9 text-xs font-medium leading-[140%]",
    large: "h-11 text-sm font-normal leading-[140%]",
    base: "h-12 text-sm font-normal leading-[100%]",
  };

  const buttonMoreStyles = {
    small: "h-9 text-sm font-normal leading-[140%]",
    large: "h-11 text-base font-normal leading-[140%]",
    base: "h-12 text-base font-normal leading-[100%]",
  };

  return (
    <Card className="border border-gray-100 bg-white shadow-none rounded-xl">
      <CardBody className={`${paddingsBody[size]}`}>
        {hasAvatar && (
          <Link href={`/veterinarians/${veterinarian.id}`}>
            <Avatar className="w-26 h-26 mb-4" radius="full" src={vet.src} />
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
        <div className={`flex gap-1 items-center ${reviewsStyles[size]} mb-6`}>
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

        <Button
          className={`flex border rounded-lg  py-2 border-primary-700 bg-primary-100 w-full mb-2 h-[55px] ${buttonMoreStyles[size]}`}
          variant="bordered"
          style={{ height: "55px" }}
        >
          <Link
            href={`/veterinarians/${veterinarian.id}/booking`}
            className="w-full"
          >
            <div className="flex flex-col">
              <span className="font-[400] text-[14px] leading-[100%] tracking-[0] text-center text-gray-600 mb-1">
                Швидке бронювання
              </span>
              <span className="font-normal text-[16px] leading-[100%] tracking-[0] align-middle text-gray-900">
                23 Тра о 18:00
              </span>
            </div>
          </Link>
        </Button>

        <Button
          className={`border rounded-lg border-gray-100 bg-background text-gray-800 w-full ${buttonTodayStyles[size]}`}
          variant="bordered"
        >
          <Link href={`/veterinarians/${veterinarian.id}`}>
            Обрати іншу дату та час
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
}
