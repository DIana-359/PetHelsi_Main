"use client";

import { useRef, useEffect, useState } from "react";
import VeterinariansList from "./VeterinariansList";
import { Button } from "@heroui/react";
import Icon from "../Icon";

interface ICarouselVetsProps {
  token?: true;
}

export default function CarouselVets({ token }: ICarouselVetsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateScrollButtons();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div id="carouselVets" className="">
      <div
        ref={containerRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide mb-6 -mr-4 md:-mr-8 xl:-mr-16">
        <VeterinariansList token={token} />
      </div>

      <div className="hidden md:flex justify-end gap-[15px]">
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
