import DoctorPage from "@/components/DoctorPage/DoctorPage";

// type Params = { id: string };
// type PageProps = { params: Params };

type Params = { id: string };
type PageProps = { params: Promise<Params> };

export default async function VeterinarianDetailsPage(props: PageProps) {
  // const { params } = props as PageProps;
  const params = await props.params;
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/vets/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return (
      <div>
        <p className="text-red-600">Помилка: ветеринар не знайдений</p>
      </div>
    );
  }

  const veterinarian = await res.json();

  return <DoctorPage veterinarian={veterinarian} />;
}
