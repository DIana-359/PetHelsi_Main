"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import DocProfile from "./DocProfile";
import { Veterinarian } from "@/utils/types/veterinarian";
import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import AboutTab from "./AboutTab";
import WorkTab from "./WorkTab";
import EducationTab from "./EducationTab";
import SlotUnavailableModal from "@/components/SlotUnavailableModal"
// import Link from "next/link";
import clsx from "clsx";
import DocReviews from "./DocReviews";
import BookingCalendar from "@/components/BookingCalendar/BookingCalendar";
import BookingCalendarMobileModal from "../BookingCalendar/BookingCalendarMobileModal";
import { useFreeScheduleSlots } from "@/hooks/vets/useFreeScheduleSlots";
import FreeVetScheduleSlots from "./FreeVetScheduleSlots";
import useMedia from "@/utils/media";
import Icon from "../Icon";
import { useBooking } from "@/contextBooking/contextBooking";
import BookingSummaryMobile from "./BookingSummaryMobile";
import SignUpModal from "@/components/ModalSignUp";
import dayjs from "dayjs";
import { useBookingFlow } from "@/hooks/booking/useBookingFlow";
import { Pulse } from "@/components/Pulse";
import { useScheduleSlots } from "@/hooks/vets/useScheduleSlots";

type Props = {
  veterinarian: Veterinarian;
  token?: boolean;
};

export default function DoctorPage({ veterinarian, token }: Props) {
  const [selected, setSelected] = useState("profile");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const {selectedDate, setSelectedDate, setSelectedTime, setPrice, setSlotId} = useBooking()
  const { data: timeSlots = [] } = useScheduleSlots(veterinarian.id, selectedDate);
  const {data: freeScheduleSlots = [], isLoading} = useFreeScheduleSlots(veterinarian.id)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlotConflictOpen, setIsSlotConflictOpen] = useState(false);
  const isMobile = useMedia();
  const bookingFlow = useBookingFlow({
    vetId: veterinarian.id,
    openSignUp: !token ? () => setIsSignUpOpen(true) : undefined,
    onSlotConflict: () => setIsSlotConflictOpen(true),
  });

  useEffect(() => {
    if (!isLoading && freeScheduleSlots.length > 0) {
      const firstSlot = freeScheduleSlots[0]
      setSelectedDate(dayjs(firstSlot.date))      
      setSelectedTime(firstSlot.startTime.slice(0, 5))
      setPrice(firstSlot.rate)
      setSlotId(firstSlot.id)
    }
  }, [isLoading, freeScheduleSlots, setSelectedDate, setSelectedTime, setPrice, setSlotId])

  const tabs = [
    {
      id: "profile",
      label: "Профіль",
      component: <AboutTab veterinarian={veterinarian} />,
    },
    {
      id: "work",
      label: "Місце роботи",
      component: <WorkTab veterinarian={veterinarian} />,
    },
    {
      id: "education",
      label: "Освіта",
      component: <EducationTab veterinarian={veterinarian} />,
    },
  ];

  const fullName = `${veterinarian.surname} ${veterinarian.name} ${veterinarian.patronymic}`;

  return (
    <div className="relative">
      {bookingFlow.isBookingLoading && (
        <div className="fixed inset-0 bg-white/50 z-[9999] flex items-center justify-center">
          <Pulse />
        </div>
      )}
      <div className="md:pt-8 grid grid-cols-1 lg:gap-x-8 lg:gap-y-0">
        <BookingCalendarMobileModal
          vetId={veterinarian.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className="min-w-0 flex flex-col gap-8 lg:col-start-1">
          <Breadcrumbs
            segments={[
              { label: "Ветеринари", href: "/veterinarians" },
              { label: fullName },
            ]}
          />

          <DocProfile veterinarian={veterinarian} />

          {isMobile && !isLoading && (
            <>
              <FreeVetScheduleSlots freeScheduleSlots={freeScheduleSlots} />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-gray w-full text-base flex gap-1 items-center"
              >
                Більше вільних годин
                <Icon
                  sprite="/sprites/sprite-sistem.svg"
                  id="arrow-rigth"
                  width="24px"
                  height="24px"
                  className="stroke-gray"
                />
              </button>
            </>
          )}

          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Doctor tabs"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key.toString())}
              variant="underlined"
              classNames={{
                base: 'relative [&_[data-slot="cursor"]]:hidden',
                tabList: "grid grid-cols-3 border-b border-gray-100 mb-6",
                panel: "pt-4",
              }}
            >
              {tabs.map((item) => (
                <Tab
                  key={item.id}
                  title={
                    <div
                      className={clsx(
                        "w-[127px] lg:w-[228px] text-center py-2 text-[16px] lg:text-[18px] font-medium",
                        selected === item.id
                          ? "text-primary-700 bg-primary-100 rounded-t-md border-b-2 border-primary-700 -mb-[4px]"
                          : "text-gray-500"
                      )}
                    >
                      {item.label}
                    </div>
                  }
                >
                  <Card className="shadow-none">
                    <CardBody>{item.component}</CardBody>
                  </Card>
                </Tab>
              ))}
            </Tabs>
          </div>

          <footer className="border-t border-gray-100 pb-8">
            <DocReviews reviews={veterinarian.reviews} />
          </footer>
        </div>

        {!isMobile && !isLoading && (
          <div className="lg:col-start-2 lg:row-span-full">
              <BookingCalendar
                vetId={veterinarian.id}
                onBook={bookingFlow.handleBooking}
                error={bookingFlow.error}
                setError={bookingFlow.setError}
              />
          </div>
        )}

        {isMobile && timeSlots.length !== 0 && 
          <BookingSummaryMobile
            onBook={bookingFlow.handleBooking}
            error={bookingFlow.error}
          />
        }
        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          hideRoleTabs={true}
        />
        <SlotUnavailableModal 
          isOpen={isSlotConflictOpen}
          onClose={() => setIsSlotConflictOpen(false)}
        />
      </div>
    </div>
  );
}
