import OwnerPetsContent from "@/components/MyPet/OwnerPetsContent";
import PetGlobalMessage from "@/components/MyPet/PetGlobalMessage";

export default function OwnerPets() {
  return (
    <div className="p-4">
      <PetGlobalMessage />
      <OwnerPetsContent />
    </div>
  );
}
