import Breadcrumbs from "@/components/Breadcrumbs";
import { VeterinarianSearchForm } from "@/components/Hero/VeterinarianSearchForm";
import VeterinariansPagination from "@/components/VeterinariansBlock/VeterinariansPagination";
import { Vet } from "@/utils/types/vet";
import SortSelect from "@/components/VeterinariansBlock/SortSelect";
import VeterinariansListPage from "@/components/VeterinariansBlock/VeterinariansListPage";
import NotFoundVet from "@/components/VeterinariansBlock/NotFoundVet";

export interface VetPageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function VeterinariansPage({
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
    const res = await fetch(
      `https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/vets?page=${
        page - 1
      }&size=12&sort=${sort}&petTypeName=${petType}&issueTypeName=${issueType}&date=${date}`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("API error", res.status, text);
      throw new Error("Не вдалося завантажити ветеринарів");
    }

    const data = await res.json();

    return (
      <div className="text-gray-500 pt-5 md:pt-8">
        <Breadcrumbs segments={[{ label: "Ветеринари" }]} />
        <div className="mt-4 mb-8 lg:w-[85%] -m-4  mx-aut sm:max-w-[50%] lg:max-w-full">
          <VeterinarianSearchForm />
        </div>
        <div>
          <div className="xs:flex items-center justify-between mb-4">
            <h2 className="text-black text-xl font-medium mb-4 xs:mb-0">
              Ветеринари
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

          <VeterinariansListPage veterinarians={data.content as Vet[]} />

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
