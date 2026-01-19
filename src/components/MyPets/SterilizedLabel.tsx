interface SterilizedLabelProps {
  sterilized?: boolean;
  gender?: string;
}

export function SterilizedLabel({ sterilized, gender }: SterilizedLabelProps) {
  const label =
    sterilized === undefined
      ? "Не вказано"
      : sterilized
      ? gender === "Дівчинка"
        ? "Стерилізована"
        : "Стерилізований"
      : gender === "Дівчинка"
      ? "Не стерилізована"
      : "Не стерилізований";

  return <span>{label}</span>;
}
