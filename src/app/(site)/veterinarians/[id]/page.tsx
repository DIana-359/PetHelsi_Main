import DoctorPage from '@/components/DoctorPage/DoctorPage';

// type Params = { id: string };
// type PageProps = { params: Params };

type Params = { id: string };
type PageProps = { params: Promise<Params> };

export default async function VeterinarianDetailsPage(props: PageProps) {
  // const { params } = props as PageProps;
   const params = await props.params;
  const { id } = params;

  const res = await fetch(
    `https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/vets/${id}`,
    { next: { revalidate: 0 } }
  );

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


