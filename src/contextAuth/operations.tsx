import axios, { AxiosError } from "axios";
interface IArgumentsSingup {
  email: string;
  password: string;
  repeatPassword: string;
  roleType: string;
}

axios.defaults.baseURL =
  "https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api";

export const fetchSignup = async (userData: IArgumentsSingup) => {
  try {
    const response = await axios.post("/v1/auth/register", userData);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new Error("Невірно введені дані.");
        case 404:
          throw new Error("Вказану роль не знайдено.");
        case 409:
          throw new Error("Пользователь с таким email уже существует.");
        default:
          throw new Error("Користувач з таким email вже існує.");
      }
    } else {
      throw new Error("Сталася помилка. Спробуйте ще раз.");
    }
  }
};

export const fetchLogout = async () => {
  try {
    const response = await axios.post("/v1/auth/logout");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response) {
      const status = error.response.status;

      if (status == 401) {
        throw new Error("Користувач вийшов з системи.");
      }
    } else {
      throw new Error("Сталася помилка. Спробуйте ще раз.");
    }
  }
};
