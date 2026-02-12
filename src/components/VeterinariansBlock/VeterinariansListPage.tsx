import VeterinarianCard from "./VeterinarianCard";
import { Vet } from "@/utils/types/vet";

export default function VeterinariansListPage({
  veterinarians,
  owner = false,
}: {
  veterinarians: Vet[];
  owner?: boolean;
}) {
  return (
    <div
      className={
        owner
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
      }>
      {veterinarians.map(veterinarian => (
        <div key={veterinarian.id}>
          <VeterinarianCard
            veterinarian={veterinarian}
            hasAvatar={true}
            size="large"
          />
        </div>
      ))}
    </div>
  );
}
