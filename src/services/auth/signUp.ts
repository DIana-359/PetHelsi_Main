interface SignupPayload {
  email: string;
  password: string;
  repeatPassword: string;
  roleType: string;
}

export async function signUp(userData: SignupPayload) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

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

  return response.json();
}