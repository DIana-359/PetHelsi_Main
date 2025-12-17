"use client";

import { useRef, useEffect, useState } from "react";
import VeterinariansList from "./VeterinariansList";
import { Button } from "@heroui/react";
import { useVetsByCriteria } from "@/hooks/vets/useVets";
import { Pulse } from "../Pulse";
import Icon from "../Icon";

interface ICarouselVetsProps {
  token?: true;
}

export default function CarouselVets({ token }: ICarouselVetsProps) {
  const { data = [], isLoading } = useVetsByCriteria({ page: 0, size: 8 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(container.scrollLeft > 1);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
  };

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 368;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      updateScrollButtons();
    });

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [data.length]);

  if (isLoading)
    return (
      <div className="flex-1 flex flex-col gap-[6px] justify-center items-center">
        <Pulse />
        <p className="text-center text-[14px] font-[400] leading-[1] text-gray-900">
          Завантаження ветеринарів...
        </p>
      </div>
    );

  return (
    <div id="carouselVets" className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto scroll-smooth scrollbar-hide mb-6 -mr-4 md:-mr-8 xl:-mr-16">
        <VeterinariansList token={token} />
      </div>

      <div className="hidden md:flex gap-[15px]  mt-auto self-end">
        <Button
          variant="bordered"
          disabled={!canScrollLeft}
          onPress={() => scroll("left")}
          className={`rounded-[100px] border-1 ${
            canScrollLeft ? "border-primary-700" : "border-gray-200"
          }`}>
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-arrow_left-fill"
            width="48px"
            height="48px"
            className={`mt-2 ml-1 ${
              canScrollLeft ? "fill-primary" : "fill-gray-200"
            }`}
          />
        </Button>

        <Button
          variant="bordered"
          disabled={!canScrollRight}
          onPress={() => scroll("right")}
          className={`rounded-[100px] border-1 ${
            canScrollRight ? "border-primary-700" : "border-gray-200"
          }`}>
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="icon-arrow_right_light"
            width="24px"
            height="24px"
            className={`${canScrollRight ? "fill-primary" : "fill-gray-200"}`}
          />
        </Button>
      </div>
    </div>
  );
}
