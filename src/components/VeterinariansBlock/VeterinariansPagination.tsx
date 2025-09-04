'use client';

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  total: number;
};

export default function VeterinariansPagination({ page, total }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      page={page}
      total={total}
      showControls
      variant="bordered"
      onChange={handleChange}
      classNames={{
        wrapper: "gap-2",
        item: "text-smal rounded-lg bg-transparent border-1 border-primary-300",
        next: "text-primary text-xl data-[disabled=true]:text-gray-200",
        prev: "text-primary text-xl data-[disabled=true]:text-gray-200",
        cursor:
          "bg-primary-100 text-primary rounded-lg border-primary-300 hover:bg-primary-400 hover:text-primary-700 border-primary border-1",
      }}
    />
  );
}
