import AuthWrapper from "./AuthWrapper";

export const metadata = {
  title: "PetHelsi — Вхід або Реєстрація",
  description:
    "Увійдіть до свого облікового запису або зареєструйтеся як власник тварини чи ветеринар у PetHelsi.",
};

export default function Auth({ children }: { children: React.ReactNode }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}