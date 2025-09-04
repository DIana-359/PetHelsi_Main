"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import DocProfile from "./DocProfile";
import { Veterinarian } from "@/utils/types/veterinarian";
import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import AboutTab from "./AboutTab";
import WorkTab from "./WorkTab";
import EducationTab from "./EducationTab";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  veterinarian: Veterinarian;
};

export default function DoctorPage({ veterinarian }: Props) {
  const [selected, setSelected] = useState("profile");

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
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="lg:max-w-[684px] h-screen">
        <Breadcrumbs
          segments={[
            { label: "Ветеринари", href: "/veterinarians" },
            { label: fullName },
          ]}
        />
        <DocProfile veterinarian={veterinarian} />

        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Doctor tabs"
            selectedKey={selected}
            onSelectionChange={key => setSelected(key.toString())}
            variant="underlined"
            classNames={{
              base: 'relative [&_[data-slot="cursor"]]:hidden',
              tabList: "grid grid-cols-3 border-b border-gray-100 mb-6",
              tabContent: "",
              panel: "pt-4",
            }}>
            {tabs.map(item => (
              <Tab
                key={item.id}
                title={
                  <div
                    className={clsx(
                      "w-[228px] text-center px-3 py-2 text-[18px] font-medium",
                      selected === item.id
                        ? "text-primary-700 bg-primary-100 rounded-t-md border-b-1 border-primary-700 -mb-[4px]"
                        : "text-gray-500"
                    )}>
                    {item.label}
                  </div>
                }>
                <Card className="shadow-none">
                  <CardBody>{item.component}</CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>

      <Link
        className="mt-30 text-gray-900 hover:text-primary-700 cursor-pointer transition-transform duration-300 hover:underline"
        href={"/veterinarians/8/booking"}>
        Booking page
      </Link>
    </div>
  );
}
