"use client";
import { useSearchParams } from "next/navigation";
import { VeterinarianSearchForm } from "@/components/VeterinariansBlock/VeterinarianSearchForm";
import NotFoundVet from "@/components/VeterinariansBlock/NotFoundVet";
import SortSelect from "@/components/VeterinariansBlock/SortSelect";
import VeterinariansListPage from "@/components/VeterinariansBlock/VeterinariansListPage";
import VeterinariansPagination from "@/components/VeterinariansBlock/VeterinariansPagination";
import { useVetsByCriteria } from "@/hooks/vets/useVets";

export default function OwnerVeterinarians() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const sort = searchParams.get("sort") ?? "rating,desc";
  const petTypeName = searchParams.get("petTypeName") ?? "";
  const issueTypeName = searchParams.get("issueTypeName") ?? "";
  const date = searchParams.get("date") ?? "";

  const { data, isLoading, isError } = useVetsByCriteria({
    page: page - 1,
    size: 12,
    sort,
    petTypeName,
    issueTypeName,
    date,
  });

  if (isLoading) {
    return <div className="p-4">Завантаження...</div>;
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-red-500">
        Сталася помилка при завантаженні сторінки.
      </div>
    );
  }

  return (
    <div className="text-gray-500">
      <div className="mb-8 -m-4 mx-aut">
        <VeterinarianSearchForm />
      </div>

      <div>
        <div className="xs:flex items-center justify-between mb-4">
          <h2 className="text-black text-xl font-medium mb-4 xs:mb-0">
            Результати пошуку:
          </h2>

          <div className="flex items-center gap-1 justify-end">
            <span className="hidden xs:block">Впорядкувати за:</span>
            <div className="w-50">
              <SortSelect />
            </div>
          </div>
        </div>

        {data.content.length === 0 && <NotFoundVet dateStr={date} />}

        <VeterinariansListPage
          veterinarians={data.content}
          owner
        />

        {data.content.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Сторінка {page} з {data.page.totalPages}
            </p>
            <VeterinariansPagination
              page={page}
              total={data.page.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
