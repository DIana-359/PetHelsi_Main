import AddNewPetForm from "@/components/MyPet/AddNewPetForm";

export default function AddNewPet() {
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="flex flex-col w-full max-w-[1048px] px-4 md:px-8">
        <section className="pt-0 pb-6">
          <AddNewPetForm />
        </section>
      </div>
    </div>
  );
}
