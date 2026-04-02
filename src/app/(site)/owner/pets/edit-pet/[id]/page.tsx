import EditPetForm from "@/components/MyPet/EditPetForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPetPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="flex flex-col w-full max-w-[1048px] px-4 md:px-8">
        <section className="pt-0 pb-6">
          <EditPetForm id={id} />
        </section>
      </div>
    </div>
  );
}
