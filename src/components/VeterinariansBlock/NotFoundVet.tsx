'use client';
import { DaysUa, MonthsUaShort } from "@/utils/constsVet";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundVet({ dateStr }: { dateStr?: string }) {
  const router = useRouter();
  const selectedDate = new Date(dateStr || "");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateButtons = useMemo(() => {
    const buttons = [];
    const totalDays = 5;
  
  
    for (let i = 1; buttons.length < totalDays; i++) {
      const next = new Date(selectedDate);
      next.setDate(selectedDate.getDate() + i);
      buttons.push(next);
    }
  
    return buttons;
  }, [dateStr]);

  const formatBtnDate = (date: Date) => {
    const day = date.getDate();
    const month = MonthsUaShort[date.getMonth()];
    return `${day} ${month}`;
  };

  const formatBtnDay = (date: Date, index: number) => {
    const isToday = selectedDate.toDateString() === today.toDateString();
    if (isToday && index === 0) {
      return "Завтра";
    }
    return DaysUa[date.getDay()];
  };

  const handleClick = (date: Date) => {
    const newDate = date.toISOString().split("T")[0];
  
    const params = new URLSearchParams(window.location.search);
    params.set("date", newDate);
  
    router.push(`/veterinarians?${params.toString()}`);
  };

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  return (
    <div className="text-black flex flex-col items-center justify-center text-center mt-18 mb-45 md:mt-32">
      <Image
        src="/Images/Folder_del_light.svg"
        alt="Folder icon"
        className="sm:w-[128px] sm:h-[128px] md:mb-6"
        width={88}
        height={88}
      />
      <p className="text-base md:text-2xl font-medium mb-8 md:mb-18">
        На обрану дату{" "}
        {`${selectedDate.getDate()} ${MonthsUaShort[selectedDate.getMonth()]}`}{" "}
        ветеринарів
        <br />
        не знайдено, найближчі інші дати:
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {dateButtons.slice(0, isMobile ? 3 : 5).map((btnDate, index) => (
          <Button
            key={btnDate.toISOString()}
            variant="bordered"
            color="primary"
            className="bg-primary-100 rounded-[6px] border-primary-100 hover:border-primary w-[108px] h-[49px] md:w-[136px] md:h-[62px]"
            onPress={() => handleClick(btnDate)}
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-xs md:text-base font-medium">
              {formatBtnDay(btnDate, index)}
              </span>
              <span className="text-black text-base md:text-lg font-medium">
                {formatBtnDate(btnDate)}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
