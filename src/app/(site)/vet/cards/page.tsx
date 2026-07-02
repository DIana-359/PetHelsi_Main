import VetSectionPlaceholder from "@/components/Vet/VetSectionPlaceholder";

export default function VetCardsPage() {
  return (
    <VetSectionPlaceholder
      title="Мої картки"
      message="Ви ще не додали жодної картки :("
      hint="Додавайте картку, для зарахування коштів за консультації."
      icon="icon-credit-card"
    />
  );
}
