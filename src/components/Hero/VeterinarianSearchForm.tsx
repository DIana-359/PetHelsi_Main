"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Select, SelectItem, DatePicker } from "@heroui/react";
import { today, CalendarDate, getLocalTimeZone } from "@internationalized/date";

import { optionsAnimals, optionsProblems } from "./Constants";
import Icon from "../Icon";
import { checkAuth } from "@/utils/checkAuth";

interface FormData {
  petTypeName: string;
  issueTypeName: string;
  date: CalendarDate | null;
}

export const VeterinarianSearchForm = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    petTypeName: "",
    issueTypeName: "",
    date: today(getLocalTimeZone()),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (formData.petTypeName)
      queryParams.set("petTypeName", formData.petTypeName);
    if (formData.issueTypeName)
      queryParams.set("issueTypeName", formData.issueTypeName);
    if (formData.date) queryParams.set("date", formData.date.toString());

    const isAuth = await checkAuth();

    if (isAuth) {
      router.push(`/owner/veterinarians?${queryParams.toString()}`);
    } else {
      router.push(`/veterinarians?${queryParams.toString()}`);
    }
  };

  return (
    <Form
      className="w-full flex-col space-x-4 lg:flex-row bg-white rounded-xl p-4"
      onSubmit={handleSubmit}
    >
      <Select
        className="lg:max-w-2xs"
        items={optionsAnimals}
        classNames={{
          base: "shadow-none",
          trigger:
            "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
        }}
        listboxProps={{
          itemClasses: {
            base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:text-primary-700 hover:!bg-primary-200",
          },
        }}
        name="petTypeName"
        value={formData.petTypeName}
        onChange={(event) =>
          setFormData({ ...formData, petTypeName: event.target.value })
        }
        aria-labelledby="animal"
        variant="bordered"
        placeholder="Тварина"
        color="primary"
        startContent={
          formData.petTypeName === "" ? (
            <Icon
              sprite="/sprites/sprite-animals.svg"
              id="icon-paw"
              width="24px"
              height="24px"
              className="stroke-primary stroke-1"
            />
          ) : null
        }
        renderValue={(selectedItems) => {
          return selectedItems.map((item) => (
            <div key={item.key} className="flex flex-row gap-2 items-center">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id={item.data?.icon || "icon-paw"}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1"
              />
              <span>{item.data?.value ?? "Тварина"}</span>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem
            className="text-gray-800"
            key={item.key}
            textValue={item.value}
          >
            <div className="flex flex-row gap-2 items-center">
              <Icon
                sprite="/sprites/sprite-animals.svg"
                id={item.icon}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1"
              />
              <span>{item.value}</span>
            </div>
          </SelectItem>
        )}
      </Select>

      <Select
        className="lg:max-w-2xs"
        items={optionsProblems}
        classNames={{
          base: "shadow-none",
          trigger:
            "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
        }}
        listboxProps={{
          itemClasses: {
            base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:text-primary-700 hover:!bg-primary-200",
          },
        }}
        name="issueTypeName"
        value={formData.issueTypeName}
        onChange={(event) =>
          setFormData({ ...formData, issueTypeName: event.target.value })
        }
        aria-labelledby="problem"
        variant="bordered"
        placeholder="Що турбує тварину?"
        color="primary"
        startContent={
          formData.issueTypeName === "" ? (
            <Icon
              sprite="/sprites/sprite-problems.svg"
              id="icon-allproblems"
              width="24px"
              height="24px"
              className="stroke-primary stroke-1"
            />
          ) : null
        }
        renderValue={(selectedItems) => {
          return selectedItems.map((item) => (
            <div key={item.key} className="flex flex-row gap-2 items-center">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id={item.data?.icon || "icon-allproblems"}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1"
              />
              <span>{item.data?.value ?? "Тварина"}</span>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem
            className="text-gray-800"
            key={item.key}
            textValue={item.value}
          >
            <div className="flex flex-row gap-2 items-center">
              <Icon
                sprite="/sprites/sprite-problems.svg"
                id={item.icon}
                width="24px"
                height="24px"
                className="stroke-primary stroke-1"
              />
              <span>{item.value}</span>
            </div>
          </SelectItem>
        )}
      </Select>

      <DatePicker
        classNames={{
          base: "shadow-none",
          inputWrapper:
            "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
        }}
        aria-labelledby="Placement start"
        selectorButtonPlacement="start"
        color="primary"
        variant="bordered"
        value={formData.date}
        onChange={(newDate) => {
          if (newDate) {
            setFormData({ ...formData, date: newDate });
          }
        }}
      />

      <Button
        className="w-full md:w-auto min-w-[200px] z-20"
        radius="sm"
        color="primary"
        type="submit"
      >
        Знайти ветеринара
      </Button>
    </Form>
  );
};
