import { VeterinarianSearchForm } from "@/components/VeterinariansBlock/VeterinarianSearchForm";
import NotFoundVet from "@/components/VeterinariansBlock/NotFoundVet";
import SortSelect from "@/components/VeterinariansBlock/SortSelect";
import VeterinariansListPage from "@/components/VeterinariansBlock/VeterinariansListPage";
import VeterinariansPagination from "@/components/VeterinariansBlock/VeterinariansPagination";
import { Vet } from "@/utils/types/vet";
import { getVetsByCriteriaServer } from "@/app/services/vets/getVetsByCriteriaServer";

export interface VetPageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function ownerVeterinarians({
  searchParams,
}: VetPageProps) {
  const params = (await searchParams) as Record<string, string>;
  const page = parseInt(params?.page || "1");
  const sort = (await params?.sort) || "rating,desc";

  const petType =
    typeof params?.petTypeName === "string" ? params.petTypeName : "";
  const issueType =
    typeof params?.issueTypeName === "string" ? params.issueTypeName : "";
  const date = typeof params?.date === "string" ? params.date : "";

  try {
    const data = await getVetsByCriteriaServer({
      page: page - 1,
      size: 12,
      sort,
      petTypeName: petType,
      issueTypeName: issueType,
      date,
    });

    return (
      <div className="text-gray-500">
        <div className="mb-8 -m-4  mx-aut ">
          <VeterinarianSearchForm />
        </div>
        <div className="aaa">
          <div className="xs:flex items-center justify-between mb-4">
            <h2 className="text-black text-xl font-medium mb-4 xs:mb-0">
              Результати пошуку:
            </h2>
            <div className="flex items-center gap-1 justify-end">
              <span className="hidden xs:block">Впорядкувати за:</span>
              <div className="w-50">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <SortSelect />
                </div>
              </div>
            </div>
          </div>
          {data.content.length === 0 && <NotFoundVet dateStr={date} />}

          <VeterinariansListPage
            veterinarians={data.content as Vet[]}
            owner={true}
            token={true}
          />

          {data.content.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-gray-700">{`Сторінка ${page} з ${data.page.totalPages}`}</p>
              <VeterinariansPagination
                page={page}
                total={data.page.totalPages}
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Помилка при отриманні даних:", err);
    return (
      <div className="p-4 text-red-500">
        Сталася помилка при завантаженні сторінки.
      </div>
    );
  }
}
