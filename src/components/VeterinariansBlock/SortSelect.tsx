"use client";

import { Select, SelectItem } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export const sorts = [
  // { key: "experience,desc", label: "За стажем" },
  { key: "rating,desc", label: "За рейтингом" },
  { key: "rate,desc", label: "За вищою вартістю" },
  { key: "rate,asc", label: "За нижчою вартістю" },
];

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "rating,desc";

  const handleChange = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", key);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      aria-label="Впорядкувати ветеринарів за"
      className="max-w-xs text-gray border-none"
      placeholder="За рейтингом"
      items={sorts}
      variant="bordered"
      classNames={{
        base: "shadow-none border-none",
        trigger:
          "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
      }}
      listboxProps={{
        itemClasses: {
          base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:text-primary-700 hover:!bg-primary-200",
        },
      }}
      color="primary"
      selectedKeys={[currentSort]}
      onChange={e => handleChange(e.target.value)}>
      {sorts.map(sort => (
        <SelectItem key={sort.key}>{sort.label}</SelectItem>
      ))}
    </Select>
  );
}
