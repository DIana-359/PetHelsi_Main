interface SterilizedLabelProps {
  sterilized?: boolean;
}

export function SterilizedLabel({ sterilized }: SterilizedLabelProps) {
  const label =
    sterilized === undefined ? "Не вказано" : sterilized ? "Так" : "Ні";

  return <span>{label}</span>;
}
