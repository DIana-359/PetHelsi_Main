"use client";

import Icon from "@/components/Icon";
import { Card, CardBody, Avatar } from "@heroui/react";
import vetImg from "@/../public/Images/VeterinarianCard-img-eg.jpg";
import { Veterinarian } from "@/utils/types/veterinarian";
import { getYearWord } from "@/utils/types/formatExperience";

type Props = {
  veterinarian: Veterinarian;
  hasAvatar?: boolean;
};

const DocProfile = ({ veterinarian, hasAvatar = true }: Props) => {
  return (
    <Card className=" shadow-none mt-8  mb-8 lg:col-start-1 lg:row-start-1">
      <CardBody className="flex flex-row gap-8 p-0">
        {hasAvatar && (
          <Avatar
            className=" w-26 h-26 lg:w-32 lg:h-32"
            radius="full"
            src={vetImg.src}
          />
        )}
        <div className="flex flex-col gap-2">
          <h4 className="text-[14px] lg:text-[24px] font-medium leading-[150%] text-gray-900">
            {veterinarian.surname} <br /> {veterinarian.name}{" "}
            {veterinarian.patronymic}
          </h4>
          <div className="flex gap-1 items-center">
            <Icon
              sprite="/sprites/sprite-sistem.svg"
              id="icon-star_fill"
              width="20px"
              height="20px"
              className="fill-primary-700 w-[20px] h-[20px]"
            />
            <span className="text-gray-900">{veterinarian.rating}</span>
            <span className="text-gray-600">
              ({veterinarian.reviews_count} відгуки)
            </span>
          </div>
          <p className="text-[14px] lg:text-[16px] font-normal leading-[140%]">
            <span className="text-gray-600">Стаж: </span>
            <span className="text-gray-800">
              {veterinarian.experience} {getYearWord(veterinarian.experience)}
            </span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default DocProfile;
