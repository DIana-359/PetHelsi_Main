import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import CarouselVets from "@/components/VeterinariansBlock/CarouselVets";

export default function Veterinarians() {
  return (
    <div
      id="veterinarians"
      className="scroll-mt-24 lg:grid grid-cols-12 gap-6 mb-21 lg:mb-14">
      <div className="lg:col-span-5 lg:pt-12">
        <h2 className="uppercase text-2xl leading-[140%] xl:text-[40px] font-semibold text-gray-900 mb-3 xl:mb-12">
          Ветеринари, <br className="hidden lg:inline" />
          доступні <br />у найближчий час
        </h2>
        <p className="text-sm leading-[135%] font-semibold text-gray-700 mb-[36px]">
          Кожен із ветеринарів — експерт у своїй справі.
          <br />
          Тільки найкращі фахівці для вашого улюбленця.
        </p>
        <Link
          className="hidden lg:flex items-center gap-4 text-lg font-medium leading-[140%] text-primary-700"
          href={"/veterinarians"}>
          Переглянути усіх ветеринарів
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-arrow_right_light"
            width="24px"
            height="24px"
            className="fill-primary-700"
          />
        </Link>
      </div>
      <div className="lg:col-span-7 flex flex-col">
        <CarouselVets />
      </div>
    </div>
  );
}
