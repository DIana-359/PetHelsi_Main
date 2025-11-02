interface IArgumentsSingup {
  email: string;
  password: string;
  repeatPassword: string;
  roleType: string;
}

export const fetchSignup = async (userData: IArgumentsSingup) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Невірно введені дані.");
        case 404:
          throw new Error("Вказану роль не знайдено.");
        case 409:
          throw new Error("Користувач з таким email вже існує.");
        default:
          throw new Error("Сталася помилка. Спробуйте ще раз.");
      }
    }

    const data = await response.json();
    return data;
  } catch {
    throw new Error("Сталася помилка. Спробуйте ще раз.");
  }
};
